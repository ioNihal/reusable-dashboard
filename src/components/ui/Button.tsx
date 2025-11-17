
import type { ButtonProps, ButtonVariant, ButtonSize } from "../../types/button";

const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    full: "w-full px-4 py-2 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-linear-to-r from-[#F58529] via-[#DD2A7B] via-[#8134AF] to-[#515BD4] text-white hover:opacity-90",
    secondary: "bg-[#EBAE00] text-white hover:bg-yellow-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    accent: "bg-purple-600 text-white hover:bg-purple-600",
};

export default function Button({
    children,
    variant = "primary",
    size = "md",
    hideInMobile = false,
    className = "",
    ...props
}: ButtonProps) {
    const base =
        "rounded-md font-medium transition-all items-center justify-center gap-2 cursor-pointer";

    const sizeClass = sizeClasses[size];
    const variantClass = variantClasses[variant];

    return (
        <button
            className={`
        ${base} 
        ${sizeClass} 
        ${variantClass} 
        ${hideInMobile ? "hidden md:inline-flex" : "inline-flex"} 
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
}
