import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import CardButton from "../../components/cardButton";
import StrapiFetch from "../../components/strapiFetch";
import   Card from "../../components/card";
import   Cards from "../../components/cards";
import AboutUs from "../../components/aboutUs";


function Home() {
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch("http://192.168.1.70:1337/admin"); // ändra till din Strapi URL
        const data = await res.json();
        // Strapi v4 returnerar i `data.attributes`
        setAboutText(data.data.attributes.text); 
      } catch (err) {
        console.error("Kunde inte hämta från Strapi:", err);
      }
    }

    fetchAbout();
  }, []);

  return (
    <div>
      <Cards/>
      <AboutUs />

      
    </div>
  );
}

export default Home;
