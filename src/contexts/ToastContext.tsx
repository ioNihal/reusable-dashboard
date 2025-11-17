import { useState, type ReactNode } from "react";

import { ToastContext } from "../hooks/useToast";
import type { ToastItem, ToastOptions } from "../types/toast";
import ToastContainer from "../components/ui/Toast/ToastContainer";


interface ToastProviderProps {
    children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const showToast = (toast: ToastOptions) => {
        const id = Date.now();

        setToasts((prev) => [...prev, { id, ...toast }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, toast.duration ?? 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    );
}
