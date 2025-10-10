import React from "react";
import SpotlightCard from "../../components/SpotlightCard";
import Particles from "../../components/Particles";
import ScrollReveal from "../../components/ScrollReveal";
import TextType from "../../components/TextType";

const Home: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "200vh", // sidan blir längre så att scroll-trigger triggas
        overflow: "hidden",
        backgroundColor: "#000", // mörk bakgrund
        color: "#fff",
      }}
    >
      {/* 🔹 Partiklar i bakgrunden */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={300} // större partiklar
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* 🔹 TextType högst upp */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          marginTop: "3rem",
        }}
      >
       <TextType
            text={["välkommen", "betala för din hemsida här"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            textStyle={{
              fontSize: "500px",     // Storleken är nu större
              fontWeight: 700,
              letterSpacing: "1px",
  }}
/>
      </div>

      {/* 🔹 Cards i mitten */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "30vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
          <h2>Lorem ipsum dolor sit.</h2>
          <p>Lorem ipsum dolor sit.</p>
        </SpotlightCard>
      </div>

      {/* 🔹 ScrollReveal-text längst ner */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "800px",
          textAlign: "center",
          margin: "80vh auto 0", // långt ner så att du måste scrolla
        }}
      >
        <ScrollReveal
          enableBlur={true}
          baseOpacity={0}
          blurStrength={5}
          rotationEnd="bottom bottom"
          wordAnimationEnd="bottom center"
          startOffset="top 80%" // startar animationen när elementets topp når 80% av viewport
        >
          When does a man die? When he is hit by a bullet? No! When he suffers a
          disease? No! When he ate a soup made out of a poisonous mushroom? No!
          A man dies when he is forgotten! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam earum omnis ipsum ad temporibus quisquam dicta veniam officiis pariatur, ratione error neque delectus velit inventore repellendus at cupiditate asperiores quae!
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Home;
