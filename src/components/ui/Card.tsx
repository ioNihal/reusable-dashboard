import type { CardProps, CardVariant } from "../../types/card";

const variantClasses: Record<CardVariant, string> = {
    default: "bg-white shadow-sm border border-gray-200 rounded-lg",
    light: "bg-blue-50 border border-blue-100 rounded-lg",
    elevated: "bg-white shadow-lg rounded-lg",
};

export default function Card({
    children,
    className = "",
    variant = "default",
}: CardProps) {
    const variantClass = variantClasses[variant];

    return <div className={`${variantClass} ${className}`}>{children}</div>;
}
