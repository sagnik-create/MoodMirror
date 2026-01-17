from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Load model artifacts ONCE at startup
model = joblib.load("emotion_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

app = FastAPI(title="Emotion Detection API")

# Request schema
class TextInput(BaseModel):
    text: str

# Response schema
class PredictionOutput(BaseModel):
    emotion: str
    confidence: float

@app.post("/predict", response_model=PredictionOutput)
def predict_emotion(data: TextInput):
    text = data.text.strip()

    # Basic validation
    if not text:
        return {"emotion": "neutral", "confidence": 0.0}

    # Vectorize input
    text_vec = vectorizer.transform([text])

    # Predict
    prediction = model.predict(text_vec)[0]
    probabilities = model.predict_proba(text_vec)[0]
    confidence = float(max(probabilities))

    # Safety fallback
    if confidence < 0.5:
        return {"emotion": "neutral", "confidence": confidence}

    return {"emotion": prediction, "confidence": confidence}
