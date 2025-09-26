import React, { useEffect, useState } from "react";

type InfoCardData = {
  id: number;
  documentId: string;
  info: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export default function InfoCard() {
  const [data, setData] = useState<InfoCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://192.168.1.70:1337/api/info-cards");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const json = await res.json();
        console.log("Strapi svar:", json);

        const fetchedData: InfoCardData | null =
          Array.isArray(json.data) && json.data.length > 0
            ? json.data[0]
            : null;

        if (!fetchedData) throw new Error("Ingen data hittades");
        setData(fetchedData);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Fel: {error}</p>;

  return (
    <div className="info-card" style={{
      maxWidth: "320px",
      margin: "2rem auto",
      background: "#fff",
      padding: "1.8rem",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
      textAlign: "center",
      fontFamily: "Segoe UI, Roboto, sans-serif",
    }}>
      <h3 style={{
        marginBottom: "1rem",
        fontSize: "1.6rem",
        color: "#222"
      }}>
        
      </h3>
      <p style={{
        marginBottom: "1.5rem",
        fontSize: "1.125rem",
        lineHeight: 1.6,
        color: "#555"
      }}>
        {data?.info || "Ingen info"}
      </p>
      
    </div>
  );
}
