import React, { useEffect, useState } from "react";

export default function Footer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch("http://192.168.1.70:1337/api/fotters", {
          headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
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
