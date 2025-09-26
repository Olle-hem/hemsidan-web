import React, { useEffect, useState } from "react";

export default function StrapiTider() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Exempel: hämta från en collection type "articles"
              const res = await fetch("http://192.168.1.70:1337/api/tider", {
          headers: {
            Authorization: `Bearer 631d2d228b582d0dd0ea661ee682bba324880dc20f7ee9704a31b18ed0079362eac8954534d6f83028735d0a269ec511b867b613caf2e842fb789d307752ef622b7fa15095323c153ea55772fff254dfabfea90784311cd6b5f33feb9ea7f60f08cb07026dff6d20572d864f1563109a69b64be14fde8d631de993d9f9909f6c`,
          },
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