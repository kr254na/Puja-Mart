import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

export default function App() {
  const [toastMessage, setToastMessage] = useState(null);
const triggerToast = (msg) => {
  setToastMessage(msg);
  setTimeout(() => {
  setToastMessage(null);
  }, 2500);
};
  return (
    <>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Home triggerToast={triggerToast}/>}/>
        </Routes>
      {/* TOAST SYSTEM ELEMENT */}
      <div 
        className={`fixed bottom-8 left-8 z-50 bg-gradient-to-r from-saffron to-saffron-deep text-white px-5 py-3.5 rounded shadow-[0_8px_30px_rgba(255,107,26,0.3)] font-cormorant text-sm border border-gold/25 pointer-events-none transition-all duration-500 transform ${
          toastMessage 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-12 opacity-0'
        }`}
      >
        {toastMessage}
      </div>
    <Footer/>
    </>
  );
}