import React from "react";
import GradientText from '../../components/GradientText'


interface PurchaseConfirmationProps {
  customerName?: string;
  email?: string;
}

const PurchaseConfirmation: React.FC<PurchaseConfirmationProps> = ({ customerName, email }) => {
  return (


    
    <div className="purchase-container">


      <h1 className="purchase-title">Tack för ditt köp!</h1>
      {customerName && <p className="purchase-text">Hej {customerName},</p>}
      <p className="purchase-text">
        Vi har mottagit din betalning och skickat en bekräftelse till {email || "din e-postadress"}.
      </p>
      <p className="purchase-text">Vi kontaktar dig så snart som möjligt.</p>
      <button className="purchase-button" onClick={() => (window.location.href = "/")}>
        Tillbaka till startsidan
      </button>
    </div>
  );
};

export default PurchaseConfirmation;
