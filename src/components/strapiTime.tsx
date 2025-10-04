import React, { useEffect, useState } from "react";

export default function StrapiTider() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;
  useEffect(() => {
    async function fetchData() {
      try {
        // Exempel: hämta från en collection type "articles"
              const res = await fetch("http://192.168.1.70:1337/api/tider", {
         headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        setData(json.data);
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
    <div className="tider-container">
      <h2>Tider</h2>
      <ul className="tider-list">
          <>
          <li >{data.monday}</li>
          <li >{data.tuesday}</li>
          <li >{data.wednesday}</li>
          <li >{data.thursday}</li>
          <li >{data.friday}</li>
          <li >{data.saturday}</li>
          <li >{data.sunday}</li>

          </>
      </ul>
    </div>
  );
}