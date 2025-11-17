export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastOptions {
    title: string;
    message: string;
    variant: ToastVariant;
    duration?: number;
}

export interface ToastItem extends ToastOptions {
    id: number;
}
