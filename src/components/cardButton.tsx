import React, { useEffect, useState } from "react";

type Card = {
  id: number;
  title: string;
  description: string;
};

export default function CardButton() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For Vite:
    const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;
  
  // For Create React App, use:
  // const STRAPI_API_TOKEN = process.env.REACT_APP_STRAPI_API_TOKEN;

  useEffect(() => {
    async function fetchCards() {
      try {
        const apiUrl = `http://192.168.1.70:1337/api/card-buttons`;

        const headers: HeadersInit = {};
       headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
        const res = await fetch(apiUrl, { headers });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        console.log("Strapi svar:", json);

        let fetchedCards: Card[] = [];

        if (json.data) {
          if (Array.isArray(json.data)) {
            fetchedCards = json.data.map((item: any) => ({
              id: item.id,
              title: item.attributes?.title ?? "Ingen titel",
              description: item.attributes?.description ?? "Ingen beskrivning",
            }));
          } else {
            const attributes = json.data.attributes;
            fetchedCards = [
              {
                id: json.data.id,
                title: attributes?.title ?? "Ingen titel",
                description: attributes?.description ?? "Ingen beskrivning",
              },
            ];
          }
        }

        setCards(fetchedCards);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Okänt fel inträffade");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  if (loading) return <p>Laddar kort...</p>;
  if (error) return <p>Fel: {error}</p>;
  if (cards.length === 0) return <p>Inga kort att visa</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", padding: "2rem", maxWidth: "900px", margin: "2rem auto" }}>
      {cards.map((card) => (
        <div key={card.id} style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "center", minHeight: "300px" }}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <button style={{ marginTop: "1rem", padding: "0.4rem 1rem", border: "none", borderRadius: "8px", background: "#242424", color: "white", cursor: "pointer", width: "100%", fontSize: "0.95rem" }}>
            Mer info
          </button>
        </div>
      ))}
    </div>
  );
}
