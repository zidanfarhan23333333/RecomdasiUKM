import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tentang from "./pages/Tentang";
import About from "./pages/About";
import Layanan from "./pages/Layanan";
import DetailPelatih from "./components/DetailPelatih";
import Pembayaran from "./components/Pembayaran";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/about" element={<About />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="pelatih/:id" element={<DetailPelatih />} />
        <Route path="pembayaran/:id" element={<Pembayaran />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
