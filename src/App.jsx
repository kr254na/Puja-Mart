import ToastContext from "./context/ToastContext";
import { useToast } from "./hooks/useToast";
import Toast from "./components/Toast";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { useEffect, useState } from "react";
import Kits from "./pages/Kits";
import About from "./pages/About";
export default function App() {
  const [particles, setParticles] = useState([]);


  useEffect(() => {
    const list = [];
    for (let i = 0; i < 50; i++) {
      const left = Math.random() * 100;
      const size = 3 + Math.random() * 5;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 10;
      const shape = Math.random() > 0.5 ? '50%' : '2px';
      const color = Math.random() > 0.5 ? '#FFD700' : '#FF6B1A';
      list.push({
        id: i,
        style: {
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          borderRadius: shape,
          backgroundColor: color,
        }
      });
    }
    setParticles(list);
  }, []);
  const toast = useToast();

  return (
    <div className="relative">
      <ToastContext.Provider value={toast}>
        <div className="fixed inset-0 pointer-events-none z-0">
          {particles.map(p => (
            <div
              key={p.id}
              className="gold-particle absolute"
              style={p.style}
            />
          ))}
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/kits" element={<Kits />} />
          <Route path="/about" element={<About/>}/>
        </Routes>
        <Footer />
        <Toast message={toast.toastMessage} />
      </ToastContext.Provider>
    </div>
  );
}