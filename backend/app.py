from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# ⭐ CORS — allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROOT
@app.get("/")
def home():
    return {"message": "GradIntel AI Backend Running"}

# AI PREDICTION
@app.get("/predict")
def predict():
    return {
        "admissionChance": "72%",
        "roi": "High",
        "visaDifficulty": "Medium",
        "suggestions": [
            "Improve IELTS score",
            "Apply to safety universities",
            "Prepare financial documents"
        ]
    }

# UNIVERSITIES FROM CSV
@app.get("/universities")
def get_universities():
    df = pd.read_csv("main_data.csv")

    data = df[[
        "University",
        "Latitude",
        "Longitude",
        "AcceptanceRate"
    ]].dropna()

    return data.to_dict(orient="records")