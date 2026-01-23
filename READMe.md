# 🪞 MoodMirror — Emotion Detection Full-Stack ML Application

MoodMirror is a production-grade, full-stack machine learning web application that performs real-time emotion detection on user-provided text.

The project demonstrates the complete lifecycle of an ML-powered system — from dataset preprocessing and model training to API deployment and frontend integration using modern web technologies.

---

## 🚀 Live Demo

- **Frontend (Vercel):** https://mood-mirror-sand.vercel.app/  
- **Backend (Render, FastAPI):** Deployed REST API for inference  

## 🧠 Project Overview

MoodMirror predicts the emotional category of a given text input using a trained NLP classification model.

High-level workflow:

1. User enters a text message in the web interface
2. Frontend sends a POST request to the backend inference API
3. Backend vectorizes the text and runs it through a trained ML model
4. Backend returns:

   * Predicted emotion label
   * Confidence score
5. Frontend renders the result in real time

---

## 🛠 Tech Stack

### Machine Learning

* Python
* Scikit-learn
* TF-IDF Vectorizer
* Logistic Regression Classifier

### Backend

* FastAPI
* Pydantic (request/response validation)
* Joblib (model serialization & loading)
* CORSMiddleware (cross-origin communication)

### Frontend

* Next.js (React)
* Tailwind CSS
* Fetch API for backend communication

### Deployment & DevOps

* Backend hosted on **Render**
* Frontend hosted on **Vercel**
* Git & GitHub for version control and CI-based deployment

---

## 🏗 System Architecture

```
User Browser
     |
     v
Next.js Frontend (Vercel)
     |
     v
FastAPI Backend (Render)
     |
     v
TF-IDF Vectorizer + ML Classifier
     |
     v
Prediction + Confidence → Frontend
```

This microservice-style separation enables:

* Independent frontend/backend deployment
* Scalable inference architecture
* Clean production system design

---

## ⚙️ How It Works (Detailed Flow)

### 1. Input Handling (Frontend)

The user types a sentence into the UI and submits the form.

Payload sent to backend:

```json
{
  "text": "I am feeling very excited today!"
}
```

---

### 2. Inference Pipeline (Backend)

At application startup:

* Trained classifier and TF-IDF vectorizer are loaded once into memory

At request time:

* Input text is cleaned and validated
* Text is transformed into TF-IDF feature vectors
* Class probabilities are computed using the trained classifier

If confidence < 0.5, the system safely defaults to `"neutral"`.

---

### 3. API Response Format

```json
{
  "emotion": "joy",
  "confidence": 0.92
}
```

---

### 4. Rendering (Frontend)

* Emotion label is displayed
* Confidence is converted into a percentage
* UI updates dynamically without page reload

---

## 🔌 API Endpoints

### Health Check

```
GET /health
```

Response:

```json
{ "status": "ok" }
```

---

### Emotion Prediction

```
POST /predict
```

Request Body:

```json
{
  "text": "I am nervous about tomorrow"
}
```

Response:

```json
{
  "emotion": "fear",
  "confidence": 0.81
}
```

---

## 🧪 Model Training Pipeline

* Dataset: Kaggle — *Emotion Detection from Text*
* Total samples: ~40,000

### Preprocessing

* Removed unused labels
* Reduced classification to 3 core emotions
* Cleaned and normalized raw text

### Feature Engineering

* TF-IDF vectorization
* Unigram-based representation

### Model

* Logistic Regression (multiclass classification)
* Evaluated using:

  * Accuracy
  * Confusion Matrix
  * Class probability outputs

### Deployment

* Model and vectorizer serialized using `joblib`
* Loaded once during API startup for low-latency inference

---

## 🔒 Production Configuration

* CORS restricted to deployed frontend domain
* Stateless REST API design
* Model artifacts loaded at startup to avoid repeated disk I/O
* Frontend and backend deployed independently

---

## ✨ Features

* Real-time emotion classification
* Confidence score output
* Deployed end-to-end ML system
* Clean and responsive UI
* Production-ready backend API

---

## 📚 Learning Outcomes

This project provided hands-on experience with:

### Machine Learning

* Text preprocessing and TF-IDF feature extraction
* Training and evaluating multiclass classifiers
* Model serialization and inference pipelines

### Backend Engineering

* Designing REST APIs with FastAPI
* Request/response validation using Pydantic
* CORS configuration and cross-origin debugging
* Production-grade model loading strategies

### Frontend Engineering

* React state management with `useState`
* Asynchronous API communication
* UI design with Tailwind CSS

### System Design & Deployment

* Separating ML inference from UI layer
* Deploying microservices on cloud platforms
* CI-based deployments using GitHub + Vercel
* Debugging networking and production environment issues

---

## 📈 Future Improvements

* Upgrade to transformer-based models (BERT)
* Support more emotion categories
* Add prediction history and analytics dashboard
* Implement authentication and rate limiting
* Improve confidence calibration

---

## 👨‍💻 Author

Built by **Sagnik Dey**
Computer Science & AI Student | Full-Stack + Machine Learning Developer

GitHub: [https://github.com/sagnik-create](https://github.com/sagnik-create)

---

## ⭐ Acknowledgements

* Kaggle for the dataset
* FastAPI & Next.js open-source communities
