import pandas as pd

# Load dataset once
data = pd.read_csv("main_data.csv")

# Fake demo student
student = {
    "name": "Rahul Sharma",
    "cgpa": 8.2,
    "ielts": 6.5,
    "budget": 40000,
    "country": "USA",
    "course": "Computer Science"
}


def gradintel_brain():

    # ---------- RECOMMENDED ACTIONS ----------
    actions = []

    if student["ielts"] < 7:
        actions.append("Improve IELTS score")

    if student["cgpa"] < 8.5:
        actions.append("Apply to Tier-2 universities")

    if student["budget"] < 45000:
        actions.append("Search for scholarships")


    # ---------- FILTER DATA ----------
    filtered = data[
        (data["Country"] == student["country"]) &
        (data["Course"] == student["course"])
    ].copy()


    # ---------- ADMISSION SCORE ----------
    def score(row):
        s = 0

        if student["cgpa"] >= row["MinCGPA"]:
            s += 40
        if student["ielts"] >= row["MinIELTS"]:
            s += 30
        if student["budget"] >= (row["TuitionUSD"] + row["LivingCostUSD"]):
            s += 30

        return s

    filtered["Score"] = filtered.apply(score, axis=1)


    # ---------- TOP UNIVERSITIES ----------
    top = filtered.sort_values(by="Score", ascending=False).head(4)
    universities = top["University"].tolist()


    # ---------- AI INSIGHTS ----------
    insights = {
        "admissionChance": f"{int(top['Score'].mean())}%",
        "roi": "High" if top["ROI"].mean() > 1 else "Medium",
        "visaDifficulty": "Medium"
    }


    # ---------- MAP ANALYSIS (COLOR GRADING) ----------
    # Only color intensity by AcceptanceRate
    map_analysis = data.groupby("Country")["AcceptanceRate"].mean().reset_index()

    mapData = map_analysis.to_dict(orient="records")

    return actions, universities, insights, mapData, student