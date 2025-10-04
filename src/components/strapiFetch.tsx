import React, { useEffect, useState } from "react";

export default function StrapiFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // For Vite, use import.meta.env; for Create React App, use process.env.REACT_APP_STRAPI_API_TOKEN
    const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

  useEffect(() => {
    async function fetchData() {
      try {
        // Exempel: hämta från en collection type "articles"
              const res = await fetch("http://192.168.1.70:1337/api/sidors", {
          headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
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
    <div>
      <h2>Artiklar från Strapi</h2>
      <ul>
        {data?.data?.map((item) => (
          <>
          <li key={item.id}>{item.title}</li>
          <p>{item.text}</p>
          </>
        ))}
      </ul>
    </div>
  );
}