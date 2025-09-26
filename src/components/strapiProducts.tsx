import React, { useEffect, useState } from "react";


export default function StrapiProducts() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://192.168.1.70:1337/api/images?populate=image", {
          headers: {
            Authorization: `Bearer 631d2d228b582d0dd0ea661ee682bba324880dc20f7ee9704a31b18ed0079362eac8954534d6f83028735d0a269ec511b867b613caf2e842fb789d307752ef622b7fa15095323c153ea55772fff254dfabfea90784311cd6b5f33feb9ea7f60f08cb07026dff6d20572d864f1563109a69b64be14fde8d631de993d9f9909f6c`,
          },
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
