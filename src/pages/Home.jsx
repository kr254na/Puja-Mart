import { useState, useEffect } from "react";
import BlogSystem from "../components/BlogSystem";
import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import WhatsAppCommerce from "../components/WhatsAppCommerce";
import ReviewSystem from "../components/ReviewSystem";
import Collections from "../components/Collections";
import Kits from "../components/Kits";
import FeaturedProducts from "../components/FeaturedProducts";
import OnlineTemple from "../components/OnlineTemple";

export default function Home({ triggerToast }) {
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
  return (
    <div className="relative">
      
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map(p => (
          <div 
            key={p.id} 
            className="gold-particle absolute" 
            style={p.style}
          />
        ))}
      </div>

      {/* Main Home Sections */}


      <Hero />
      <MarqueeStrip />
          <OnlineTemple/>
    <Collections />
    <Kits/>
    <FeaturedProducts/>
      <BlogSystem isHomePage={true} />
      <ReviewSystem isHomePage={true} />
      <WhatsAppCommerce triggerToast={triggerToast} />
    </div>
  );
}
