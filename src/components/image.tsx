import React, { useEffect, useState } from "react";

type ImageCardType = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
};

export default function ImageCard() {
  const [cards, setCards] = useState<ImageCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

  useEffect(() => {
    async function fetchCards() {
      try {
        const apiUrl = `http://192.168.1.70:1337/api/images`; // ändra endpoint om din collection heter annat

        const headers: HeadersInit = {};
          headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },

        const res = await fetch(apiUrl, { headers });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        console.log("Strapi svar:", json);

        let fetchedCards: ImageCardType[] = [];

        if (json.data) {
          if (Array.isArray(json.data)) {
            // Collection type
            fetchedCards = json.data.map((item: any) => ({
              id: item.id,
              imageUrl: item.attributes?.imageUrl ?? "https://picsum.photos/400/250",
              title: item.attributes?.title ?? "Ingen titel",
              description: item.attributes?.description ?? "Ingen beskrivning",
            }));
          } else {
            // Single type
            const attributes = json.data.attributes;
            fetchedCards = [
              {
                id: json.data.id,
                imageUrl: attributes?.imageUrl ?? "https://picsum.photos/400/250",
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

  if (loading) return <p>Laddar bilder...</p>;
  if (error) return <p>Fel: {error}</p>;
  if (cards.length === 0) return <p>Inga bilder att visa</p>;

  return (
    <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", padding: "2rem" }}>
      {cards.map((card) => (
        <div key={card.id} style={{ position: "relative", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <img src={card.imageUrl} alt={card.title} style={{ width: "100%", height: "250px", objectFit: "cover" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.6)", color: "white", padding: "1rem" }}>
            <h3 style={{ margin: 0 }}>{card.title}</h3>
            <p style={{ margin: 0 }}>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
