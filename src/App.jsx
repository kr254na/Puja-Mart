import ToastContext from "./context/ToastContext";
import { useToast } from "./hooks/useToast";
import Toast from "./components/Toast";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {

  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />

      <Toast message={toast.toastMessage} />
    </ToastContext.Provider>
  );
}