

import React, { useState } from "react";

export default function TextForm() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/texts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Texten har sparats i databasen!");
        setText("");
      } else {
        setMessage(data.error || "Fel vid sparande");
      }
    } catch (err) {
      console.error(err);
      setMessage("Kunde inte nå servern");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>Skriv vad du vill göra</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          style={{ width: "100%", padding: "0.5rem" }}
          placeholder="Skriv din idé här..."
        />
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1rem",
            border: "none",
            borderRadius: "8px",
            background: "#242424",
            color: "white",
            cursor: "pointer",
          }}
        >
          Spara i databasen
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
