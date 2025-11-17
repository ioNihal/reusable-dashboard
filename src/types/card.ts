export type CardVariant = "default" | "light" | "elevated";

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: CardVariant;
}
