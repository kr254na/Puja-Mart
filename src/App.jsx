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
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./components/ScrollToTop";
import KitDetail from "./pages/KitDetail";
import Reviews from "./pages/Reviews";
import Blogs from "./pages/Blogs";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import FAQ from "./pages/FAQ";

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
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/kits" element={<Kits />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/products/:id" element={<ProductDetail/>}/>
          <Route path="/kits/:id" element={<KitDetail />} />
          <Route path="/reviews" element={<Reviews/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/shipping-policy" element={<ShippingPolicy/>}/>
          <Route path="/return-policy" element={<ReturnPolicy/>}/>
          <Route path="/refund-policy" element={<RefundPolicy/>}/>
          <Route path="/faq" element={<FAQ/>}/>
        </Routes>
        <Footer />
        <Toast message={toast.toastMessage} />
      </ToastContext.Provider>
    </div>
  );
}