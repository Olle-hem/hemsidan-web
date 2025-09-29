import React from "react";

interface PurchaseConfirmationProps {
  customerName?: string; // valfritt, kan visa kundens namn
  email?: string;
}

const PurchaseConfirmation: React.FC<PurchaseConfirmationProps> = ({ customerName, email }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tack för ditt köp!</h1>
      {customerName && <p style={styles.text}>Hej {customerName},</p>}
      <p style={styles.text}>
        Vi har mottagit din betalning och skickat en bekräftelse till {email || "din e-postadress"}.
      </p>
      <p style={styles.text}>Vi kontaktar dig så snart som möjligt.</p>
      <button style={styles.button} onClick={() => window.location.href = "/"}>
        Tillbaka till startsidan
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "500px",
    margin: "100px auto",
    padding: "40px",
    textAlign: "center",
    borderRadius: "12px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#28a745",
  },
  text: {
    fontSize: "16px",
    marginBottom: "15px",
    color: "#333",
  },
  button: {
    padding: "12px 30px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default PurchaseConfirmation;
