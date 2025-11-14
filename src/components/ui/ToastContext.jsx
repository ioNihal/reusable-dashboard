import { useState } from "react";
import ToastContainer from "./ToastContainer";
import { ToastContext } from "../../hooks/useToast";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}
