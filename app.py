import streamlit as st
import pandas as pd
import plotly.express as px
import pickle
import numpy as np

# --- CONFIG & THEME ---
st.set_page_config(page_title="GradIntel | AI Career Counselor", layout="wide", page_icon="⭐")

# Custom CSS for the "Futuristic Dark Blue" Theme
st.markdown("""
    <style>
    .main { background-color: #0E1117; color: white; }
    .stButton>button { 
        background: linear-gradient(45deg, #1E3A8A, #3B82F6); 
        color: white; border: none; border-radius: 10px; padding: 10px 24px;
    }
    .metric-card {
        background: rgba(255, 255, 255, 0.05);
        padding: 20px; border-radius: 15px; border: 1px solid #3B82F6;
    }
    </style>
    """, unsafe_allow_html=True)

# --- LOAD DATA & MODEL ---
@st.cache_data
def load_data():
    return pd.read_csv('FINAL_GLOBAL_ENGINEERING_COLLEGES_DATASET.csv')

@st.cache_resource
def load_model():
    return pickle.load(open('models/admission_model.pkl', 'rb'))

df = load_data()
model = load_model()

# --- SIDEBAR NAVIGATION ---
st.sidebar.title("⭐ GradIntel ⭐")
menu = st.sidebar.radio("Navigation", ["Home & Profile", "AI Dashboard", "Global University Map", "GradIntel AI Chat"])

# --- SESSION STATE FOR USER PROFILE ---
if 'user_data' not in st.session_state:
    st.session_state.user_data = None

# --- PAGE: HOME & ONBOARDING ---
if menu == "Home & Profile":
    st.title("🎓 GradIntel: Engineering Career AI")
    st.write("Welcome to India's first AI-driven overseas guidance platform.")
    
    with st.form("onboarding_form"):
        col1, col2 = st.columns(2)
        with col1:
            name = st.text_input("Full Name")
            level = st.selectbox("Current Education", ["Undergraduate", "Graduate"])
            branch = st.text_input("Engineering Branch")
            cgpa = st.number_input("Current CGPA", 0.0, 10.0, 8.5)
        with col2:
            ielts = st.number_input("IELTS Score", 0.0, 9.0, 7.0)
            gre = st.number_input("GRE Score", 260, 340, 310)
            budget = st.number_input("Budget (in INR)", 500000, 10000000, 3000000)
            countries = st.multiselect("Preferred Countries", df['Country'].unique(), default=["USA", "Germany", "Canada"])
        
        submit = st.form_submit_button("Generate AI Insights")
        if submit:
            st.session_state.user_data = {
                "name": name, "cgpa": cgpa, "ielts": ielts, "gre": gre, 
                "budget": budget, "countries": countries, "level": level
            }
            st.success("Profile Analyzed! Move to the AI Dashboard.")

# --- PAGE: AI DASHBOARD ---
elif menu == "AI Dashboard":
    if st.session_state.user_data is None:
        st.warning("Please complete your profile on the Home page first.")
    else:
        user = st.session_state.user_data
        st.header(f"📊 {user['level']} Career Dashboard for {user['name']}")
        
        # Recommendation Engine Logic
        budget_usd = user['budget'] / 83.0
        recs = df[
            (df['MinCGPA'] <= user['cgpa']) & 
            (df['MinIELTS'] <= user['ielts']) & 
            (df['Country'].isin(user['countries'])) &
            (df['TuitionUSD'] + df['LivingCostUSD'] <= budget_usd)
        ].sort_values(by="ROI", ascending=False).head(5)

        # Metrics Row
        m1, m2, m3 = st.columns(3)
        m1.metric("Universities Found", len(recs))
        m2.metric("Max ROI Potential", f"{recs['ROI'].max()}x" if not recs.empty else "N/A")
        m3.metric("Budget Util.", f"{(recs['TuitionUSD'].mean() * 83 / user['budget'] * 100):.1f}%" if not recs.empty else "0%")

        st.subheader("🎯 Top University Recommendations")
        if not recs.empty:
            for _, row in recs.iterrows():
                # AI Prediction logic
                input_data = np.array([[row['MinCGPA'], row['MinIELTS'], row['GRE'], row['AcceptanceRate']]])
                difficulty_score = model.predict(input_data)[0]
                prob = max(10, min(95, 100 - (difficulty_score / 1.5))) # Synthetic prob score

                with st.expander(f"{row['University']} - {row['Course']}"):
                    c1, c2, c3 = st.columns(3)
                    c1.write(f"**Country:** {row['Country']}")
                    c1.write(f"**Total Cost:** ₹{(row['TuitionUSD'] + row['LivingCostUSD']) * 83:,.0f}")
                    
                    c2.write(f"**ROI:** {row['ROI']}x")
                    c2.write(f"**Avg Salary:** ${row['AvgSalaryUSD']:,.0f}")
                    
                    c3.markdown(f"### Admission Prob: **{prob:.1f}%**")
                    st.progress(prob/100)
                    st.info(f"**Why this?** Matches your CGPA of {user['cgpa']} and falls within your ₹{user['budget']:,.0f} budget.")
        else:
            st.error("No universities match your strict criteria. Try increasing your budget or preferred countries.")

# --- PAGE: WORLD MAP ---
elif menu == "Global University Map":
    st.header("🌐 Global Engineering Opportunity Map")
    fig = px.scatter_mapbox(
        df, lat="Latitude", lon="Longitude", color="AcceptanceRate",
        size="AvgSalaryUSD", hover_name="University", 
        hover_data=["Course", "TuitionUSD", "ROI"],
        color_continuous_scale="RdYlGn", zoom=1, height=600
    )
    fig.update_layout(mapbox_style="carto-darkmatter")
    st.plotly_chart(fig, use_container_width=True)

# --- PAGE: CHATBOT ---
elif menu == "GradIntel AI Chat":
    st.header("⭐ GradIntel AI Counselor ⭐")
    if "messages" not in st.session_state:
        st.session_state.messages = [{"role": "assistant", "content": "Hello! I am your GradIntel AI. Ask me about visas, ROI, or universities."}]

    for msg in st.session_state.messages:
        st.chat_message(msg["role"]).write(msg["content"])

    if prompt := st.chat_input():
        st.session_state.messages.append({"role": "user", "content": prompt})
        st.chat_message("user").write(prompt)
        
        # Simple Logic-based responses for the sprint
        response = "Based on our dataset, your selected profile has high demand in Germany and the USA for AI roles. Would you like to see the visa requirements for these?"
        st.session_state.messages.append({"role": "assistant", "content": response})
        st.chat_message("assistant").write(response)