"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setPrediction(data.emotion);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Welcome to MoodMirror</h1>

      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Submit"}
      </button>

      {prediction && (
        <p>
          <strong>Predicted Mood:</strong> {prediction}
          <strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%
        </p>
      )}
    </main>
  );
}
