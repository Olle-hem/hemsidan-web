import React from "react";

const Card: React.FC = () => {
  return (
    <div className="card">
      <img
        src="https://picsum.photos/400/200"
        alt="Exempelbild"
        className="card-image"
      />
      <h1>Hej världen!</h1>
      <p>
        Det här är ett enkelt kort gjort med React och TypeScript.
        Det använder vanlig CSS för stilen.
      </p>
    </div>
  );
};

export default Card;
