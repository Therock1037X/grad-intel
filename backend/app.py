from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ml_engine import gradintel_brain
from pydantic import BaseModel

app = FastAPI()

# allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/predict")
def predict():

    actions, universities, insights, mapData, student = gradintel_brain()

    return {
        "student": student,
        "suggestions": actions,
        "universities": universities,
        "insights": insights,
        "mapData": mapData
    }
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat_ai(req: ChatRequest):

    msg = req.message.lower()

    if "ielts" in msg:
        return {"reply": "Your IELTS should be at least 7.5 for top universities."}

    if "country" in msg:
        return {"reply": "USA and Canada match your profile best."}

    if "visa" in msg:
        return {"reply": "Visa difficulty is medium for USA."}

    if "roi" in msg:
        return {"reply": "Computer Science programs provide highest ROI."}

    if "university" in msg:
        return {"reply": "Consider ASU, University of Texas, TU Munich."}

    return {"reply": "Focus on academics and English proficiency."}