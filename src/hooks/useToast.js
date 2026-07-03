import { useState, useRef, useEffect } from "react";

export function useToast() {
  const [toastMessage, setToastMessage] = useState(null);
  const timerRef = useRef(null);

  const triggerToast = (message) => {
    // Clear any existing active timeout to prevent it from clearing the new message
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToastMessage(message);

    // Store the new timeout ID in the ref
    timerRef.current = setTimeout(() => {
      setToastMessage(null);
      timerRef.current = null;
    }, 2500);
  };

  // Cleanup effect: clear timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    toastMessage,
    triggerToast,
  };
}