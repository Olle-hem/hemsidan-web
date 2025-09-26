import React, { useEffect, useState } from "react";

export default function Footer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch("http://192.168.1.70:1337/api/fotters", {
          headers: {
            Authorization: `Bearer 631d2d228b582d0dd0ea661ee682bba324880dc20f7ee9704a31b18ed0079362eac8954534d6f83028735d0a269ec511b867b613caf2e842fb789d307752ef622b7fa15095323c153ea55772fff254dfabfea90784311cd6b5f33feb9ea7f60f08cb07026dff6d20572d864f1563109a69b64be14fde8d631de993d9f9909f6c`,
          },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        console.log("Strapi svar:", json);
        setData(json);
      } catch (err) {
        console.error("Kunde inte hämta från Strapi:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Fel: {error}</p>;
  if (!data) return null;

  const footer = data.data?.[0]?.attributes;

  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>{footer?.Title}</h3>
        <p>{footer?.email}</p>
        <p>{footer?.number}</p>
        <p>{footer?.Facebook}</p>
        <p>{footer?.Instagram}</p>
      </div>

      <div className="footer-section">
        <h3>Följ oss</h3>
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
      </div>

      <div>
        <p>&copy; 2025 Mitt Företag. Alla rättigheter förbehållna.</p>
      </div>
    </footer>
  );
}
