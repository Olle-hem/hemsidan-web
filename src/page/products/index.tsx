import React, { useState } from "react";
import Stepper, { Step } from "../../components/Stepper";
import Button from "../../components/button";

export default function Products() {
  const [name, setName] = useState("");

  return (
    <div style={{ maxWidth: 600 , margin: "2rem auto", padding: "0 1rem" }}>
      <Stepper
        initialStep={1}
        onStepChange={(step) => console.log("Step changed:", step)}
        onFinalStepCompleted={() => console.log("All steps completed!")}
        backButtonText="Previous"
        nextButtonText="Next"
      >
        <Step>
          <h2>steg 1</h2>
          <p>Tryck på knappen för att betala</p>
        </Step>
        <Step>
          <h2>steg 2</h2>
          
          <p>fyll i din information</p>
        </Step>
        <Step>
          <h2>Fyll i epost och dit nummer!!</h2>
          
        </Step>
        <Step>
          <h2>Vänta</h2>
          <p>Du bör ha kommit till en avsluts sida det betyder att vi har fåt din bestälning och du kummer få infromation innom kort</p>
        </Step>
      </Stepper>

      <Button />
    </div>
  );
}
