import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tentang from "./pages/Tentang";
import About from "./pages/About";
import Layanan from "./pages/Layanan";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/about" element={<About />} />
        <Route path="/layanan" element={<Layanan />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
