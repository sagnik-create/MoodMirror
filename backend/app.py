from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_in_threadpool


app = FastAPI(title="Emotion Detection API")

import os

FRONTEND_URL = os.getenv("FRONTEND_URL", "*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL] if FRONTEND_URL else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model artifacts ONCE at startup
model = joblib.load("emotion_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

# Request schema
class TextInput(BaseModel):
    text: str

# Response schema
class PredictionOutput(BaseModel):
    emotion: str
    confidence: float

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionOutput)
async def predict_emotion(data: TextInput):
    return await run_in_threadpool(sync_predict, data)

def sync_predict(data: TextInput):
    text = data.text.strip()

    if not text:
        return {"emotion": "neutral", "confidence": 0.0}

    text_vec = vectorizer.transform([text])
    prediction = model.predict(text_vec)[0]
    probabilities = model.predict_proba(text_vec)[0]
    confidence = float(max(probabilities))

    if confidence < 0.5:
        return {"emotion": "neutral", "confidence": confidence}

    return {"emotion": prediction, "confidence": confidence}

