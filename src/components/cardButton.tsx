import React, { useState } from "react";

export default function CardButton() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  

  const handlePayment = async () => {
    if (!email) {
      alert("Fyll i din e-postadress först!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "Testkunde" }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "https://buy.stripe.com/test_8x2dR9aCz9IU2libEBbEA06";

      } else {
        alert(data.error || "Fel vid betalning");
      }
    } catch (err) {
      console.error(err);
      alert("Fel vid kontakt med servern");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h3>Börja prenumerera</h3>
        <p>Första betalning 1000 SEK + 200 SEK/mån</p>
        <input
          type="email"
          placeholder="Din e-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1rem",
            border: "none",
            borderRadius: "8px",
            background: "#242424",
            color: "white",
            cursor: "pointer",
            width: "100%",
            fontSize: "0.95rem",
          }}
        >
          {loading ? "Laddar..." : "Betala nu"}
        </button>
      </div>
    </div>
  );
}
