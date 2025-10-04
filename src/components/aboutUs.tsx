import React, { useEffect, useState } from "react";


export default function AboutUs() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // If using Vite:
    const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;
  
  // If using Create React App, use:
  // const STRAPI_API_TOKEN = process.env.REACT_APP_STRAPI_API_TOKEN;
 
  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch("http://192.168.1.70:1337/api/about-us", {
          headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        console.log("Strapi svar:", json);
        setData(json);
      } catch (err: any) {
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

  return (
    <div className="about-container">
      <h2>{data?.data?.Title}</h2>
      <p>{data?.data?.Facts}</p>
    </div>
  );
}
