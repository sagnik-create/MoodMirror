"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    console.log(text);
  };

  return (
    <main>
      <h1>Welcome to MoodMirror</h1>
      <p>Your personal mood tracking application.</p>

      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
}
