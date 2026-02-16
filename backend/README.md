# Overseas Education Guidance Chatbot (Standalone)

This is a standalone AI chatbot that acts as a virtual overseas education counselor for Indian engineering students.

## Features

- Answers questions on:
  - University selection
  - Eligibility criteria
  - IELTS/GRE exam readiness
  - Scholarships and funding options
  - Application process (SOP/LOR/timelines)
  - Visa and documentation
  - Migration and post-study jobs
  - Cost of study and ROI
- Gives actionable suggestions (profile improvement, country fit by budget, step-by-step prep)
- Friendly student-focused responses
- Uses OpenAI Chat Completions API

## Tech Stack

- Backend: FastAPI (Python)
- Frontend: HTML/CSS/JavaScript (served by FastAPI)

## Run Locally (VS Code)

1. Open terminal in `backend` folder:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

(Windows PowerShell)

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set your OpenAI API key:

```bash
export OPENAI_API_KEY="your_api_key_here"
```

(Windows PowerShell)

```powershell
$env:OPENAI_API_KEY="your_api_key_here"
```

Optional: choose a model (default is `gpt-4o-mini`):

```bash
export OPENAI_MODEL="gpt-4o-mini"
```

5. Start server:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

6. Open in browser:

- Chatbot UI: http://127.0.0.1:8000
- API docs: http://127.0.0.1:8000/docs

## API Endpoint

### `POST /chat`

Request:

```json
{
  "message": "My CGPA is 7.8 and budget is 25 lakhs. Which countries should I target?"
}
```

Response:

```json
{
  "reply": "...AI counselor response..."
}
```

## System Prompt Used

> "You are an AI overseas education counselor helping engineering students from India plan their study abroad journey. Provide clear, accurate, and actionable guidance."
