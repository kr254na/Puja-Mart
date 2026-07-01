import { useState } from "react";

export function useToast() {
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return {
    toastMessage,
    triggerToast,
  };
}