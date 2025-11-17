import { createContext, useContext } from "react";
import type { ToastOptions } from "../types/toast";


export interface ToastContextValue {
    showToast: (toast: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within a ToastProvider");
    return ctx;
}
