import React, { useEffect, useState } from "react";

type Card = {
  id: number;
  card1: string;
  card2: string;
  card3: string;
};

export default function Cards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await fetch("http://192.168.1.70:1337/api/cardes", { // kontrollera endpoint
          headers: {
            Authorization: `Bearer 631d2d228b582d0dd0ea661ee682bba324880dc20f7ee9704a31b18ed0079362eac8954534d6f83028735d0a269ec511b867b613caf2e842fb789d307752ef622b7fa15095323c153ea55772fff254dfabfea90784311cd6b5f33feb9ea7f60f08cb07026dff6d20572d864f1563109a69b64be14fde8d631de993d9f9909f6c`,
          },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        console.log("Strapi svar:", json);

        const fetchedCards: Card[] = [];

        if (json.data) {
          if (Array.isArray(json.data)) {
            // Collection type
            fetchedCards.push(
              ...json.data.map((item: any) => ({
                id: item.id,
                card1: item.card1,
                card2: item.card2,
                card3: item.card3 ,
              }))
            );
          } else {
            // Single type
            const attributes = json.data.attributes;
            fetchedCards.push({
              id: json.data.id,
              card1: attributes?.card1 || "Ingen text",
              card2: attributes?.card2 || "Ingen text",
              card3: attributes?.card3 || "Ingen text",
            });
          }
        }

        setCards(fetchedCards);
      } catch (err: any) {
        console.error("Kunde inte hämta kort:", err);
        setError(err.message);
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        padding: "2rem",
        maxWidth: "900px",
        margin: "2rem auto",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          style={{
            background: "#fff",
            color: "#000",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            textAlign: "center" as const,
            minHeight: "200px",
          }}
        >
          <h3 style={{ marginBottom: "0.5rem" }}>Kort {card.id}</h3>
          <p style={{ marginBottom: "0.5rem" }}>{card.card1}</p>
          <p style={{ marginBottom: "0.5rem" }}>{card.card2}</p>
          <p style={{ marginBottom: "1rem" }}>{card.card3}</p>
          <button
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "8px",
              background: "#242424",
              color: "white",
              cursor: "pointer",
              width: "100%",
              fontSize: "0.95rem",
            }}
          >
            Mer info
          </button>
        </div>
      ))}
    </div>

    
  );
}
