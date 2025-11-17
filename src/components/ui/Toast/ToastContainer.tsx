import type { ToastItem } from "../../../types/toast.ts";
import Toast from "./Toast.tsx";


interface ToastContainerProps {
    toasts: ToastItem[];
}

export default function ToastContainer({ toasts }: ToastContainerProps) {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3">
            {toasts.map((t) => (
                <Toast
                    key={t.id}
                    title={t.title}
                    message={t.message}
                    variant={t.variant}
                />
            ))}
        </div>
    );
}
