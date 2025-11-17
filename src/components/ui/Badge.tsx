import type { BadgeProps, BadgeVariant } from "../../types/badge";

const variantClasses: Record<BadgeVariant, string> = {
    default: "bg-gray-200 text-gray-800",
    completed: "bg-green-100 text-green-700 border border-green-300",
    running: "bg-blue-100 text-blue-700 border border-blue-300",
    pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    failed: "bg-red-100 text-red-700 border border-red-300",
    action: "bg-blue-50 text-blue-600 border border-blue-100",
};

export default function Badge({
    children,
    className = "",
    variant = "default",
}: BadgeProps) {
    const variantClass = variantClasses[variant];

    return (
        <span
            className={`
        inline-block w-max px-3 py-1 
        text-xs font-medium rounded-sm
        ${variantClass} ${className}
      `}
        >
            {children}
        </span>
    );
}
