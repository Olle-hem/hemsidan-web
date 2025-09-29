import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./page/Home";
import Info from "./page/Info";
import Products from "./page/products"; // <-- rätt namn med stor bokstav
import Changer from "./page/changer";
import Confirmer from "./page/confirmer"; // <-- rätt namn med stor bokstav
function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/info">Info</Link> |{" "}
        
        <Link to="/products">Products</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
         <Route path="/changer" element={<Changer />} />
       
        <Route path="/products" element={<Products />} /> {/* stor bokstav */}
        <Route path="/confirmer" element={<Confirmer />} /> {/* stor bokstav */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
