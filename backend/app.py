from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Emotion Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mood-mirror-sand.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],                      # allow all HTTP methods
    allow_headers=["*"],                      # allow all headers
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
