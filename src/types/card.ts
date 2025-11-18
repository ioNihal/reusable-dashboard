export type CardVariant =
    | "default"
    | "light"
    | "elevated"
    | "outline"
    | "ghost"
    | "glass"
    | "soft"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "hover"
    | "interactive"
    | "dashboard"
    | "pricing";


export interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: CardVariant;
}
