import type { CardProps, CardVariant } from "../../types/card";

const variantClasses: Record<CardVariant, string> = {
    default: "bg-white shadow-sm border border-gray-200 rounded-lg",

    light: "bg-blue-50 border border-blue-100 rounded-lg",

    elevated: "bg-white shadow-lg rounded-lg",

    outline: "bg-transparent border border-gray-300 rounded-lg",

    ghost: "bg-transparent border-none shadow-none",

    glass: "backdrop-blur-md bg-white/30 border border-white/20 shadow-sm rounded-xl",

    soft: "bg-gray-100 border border-gray-200 rounded-lg",

    danger: "bg-red-50 border border-red-200 text-red-800 rounded-lg",
    success: "bg-green-50 border border-green-200 text-green-800 rounded-lg",
    warning: "bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg",
    info: "bg-blue-50 border border-blue-200 text-blue-800 rounded-lg",

    hover: "bg-white border border-gray-200 rounded-lg transition-all hover:shadow-md",

    interactive:
        "bg-white border border-gray-200 rounded-lg transition-all hover:shadow-lg active:scale-[0.98]",

    dashboard: "bg-white/80 shadow-sm border border-gray-100 rounded-xl backdrop-blur",
    pricing: "bg-white rounded-lg border border-gray-200 shadow-md",


};

export default function Card({
    children,
    className = "",
    variant = "default",
}: CardProps) {
    const variantClass = variantClasses[variant];

    return <div className={`${variantClass} ${className}`}>{children}</div>;
}
