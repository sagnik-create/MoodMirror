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
    setConfidence(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${API_URL}/predict`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setPrediction(data.emotion);
      setConfidence(data.confidence);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-indigo-600 flex items-center justify-center p-6 relative">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-4">
          MoodMirror
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Type how you're feeling and let AI reflect your mood.
        </p>

        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows="4"
          placeholder="I feel worried about my exams..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />


        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="w-full mt-4 bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Submit"}
        </button>

        {prediction && (
          <div className="mt-6 p-4 rounded-lg bg-indigo-50 text-center">
            <p className="text-lg text-black">
              <span className="font-semibold text-indigo-600">
                Predicted Mood:
              </span>{" "}
              {prediction}
            </p>

            {confidence !== null && (
              <p className="text-sm text-gray-700 mt-1">
                Confidence: {(confidence * 100).toFixed(2)}%
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 right-6 text-white text-sm opacity-80">
        Created by Sagnik Dey
      </div>
    </main>
  );
}
