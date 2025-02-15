import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tentang from "./pages/Tentang";
import About from "./pages/About";
import Riwayat from "./pages/Riwayat";
import Layanan from "./pages/Layanan";
import DetailPelatih from "./components/DetailPelatih";
import Pembayaran from "./components/Pembayaran";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./context/ThemeContext";

// Layout untuk halaman utama (dengan Navbar & Footer)
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Halaman yang memiliki Navbar & Footer */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/tentang"
            element={
              <MainLayout>
                <Tentang />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/layanan"
            element={
              <MainLayout>
                <Layanan />
              </MainLayout>
            }
          />
          <Route
            path="/riwayatpesan"
            element={
              <MainLayout>
                <Riwayat />
              </MainLayout>
            }
          />
          <Route
            path="/pelatih/:id"
            element={
              <MainLayout>
                <DetailPelatih />
              </MainLayout>
            }
          />
          <Route
            path="/pembayaran/:id"
            element={
              <MainLayout>
                <Pembayaran />
              </MainLayout>
            }
          />

          {/* Halaman tanpa Navbar & Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
