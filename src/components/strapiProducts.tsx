import React, { useEffect, useState } from "react";


export default function StrapiProducts() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // For Vite, use import.meta.env; for CRA, use process.env.REACT_APP_STRAPI_API_TOKEN
  const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://192.168.1.70:1337/api/images?populate=image", {
          headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        setData(json);
        console.log("Strapi produkts:", json);
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
    <div className="products-container">
      <h2>Artiklar från Strapi</h2>
      <ul className="products-list">
        {data?.data?.map((item) => (
          <li className="product-card" key={item.id}>
            {item.image?.map((image, index) => (
              <img
                key={index}
                src={"http://192.168.1.71:1337" + image.url}
                alt={item.namn || "Produktbild"}
              />
            ))}
            <h3>{item.namn}</h3>
            <p>{item.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
