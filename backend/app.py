import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
from pydantic import BaseModel

from ml_engine import gradintel_brain

SYSTEM_PROMPT = (
    "You are an AI overseas education counselor helping engineering students "
    "from India plan their study abroad journey. Provide clear, accurate, and "
    "actionable guidance."
)

COUNSELING_GUIDELINES = """
You should behave like a friendly, supportive virtual counselor.
Always include practical next steps where possible.
Topics you can guide students on:
- University selection (Tier-1 / Tier-2 / Tier-3 fit)
- Eligibility criteria and profile evaluation (CGPA, backlog, projects)
- IELTS/GRE improvement plans
- Scholarships, assistantships, and education loans
- Application timeline and SOP/LOR guidance
- Visa process and required documentation
- Migration preparation and post-study job planning
- Cost of study and realistic ROI discussion

When student scores or profile are weak, suggest specific improvements (for example IELTS strategy, CGPA targets, project/research internships, country alternatives by budget).
Keep language simple and clear for Indian engineering students.
""".strip()

OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

app = FastAPI(title="GradIntel Overseas Counselor Bot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

STATIC_DIR = Path(__file__).parent / "static"
if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    index_file = STATIC_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return {"message": "Frontend not found. Create backend/static/index.html"}


@app.get("/predict")
def predict():
    actions, universities, insights, mapData, student = gradintel_brain()
    return {
        "student": student,
        "suggestions": actions,
        "universities": universities,
        "insights": insights,
        "mapData": mapData,
    }


@app.post("/chat")
def chat_ai(req: ChatRequest):
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        return {
            "reply": (
                "I can guide you with study-abroad counseling, but OpenAI is not configured yet. "
                "Please set OPENAI_API_KEY in your terminal/environment and restart the server."
            )
        }

    client = OpenAI(api_key=api_key)

    completion = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "system", "content": COUNSELING_GUIDELINES},
            {"role": "user", "content": req.message},
        ],
        temperature=0.4,
    )

    reply = completion.choices[0].message.content or "I could not generate a response."
    return {"reply": reply}
