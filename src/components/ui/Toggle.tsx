interface ToggleProps {
    label?: string;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    className?: string;
    variant?:
        | "default"
        | "outline"
        | "soft"
        | "solid"
        | "glow"
        | "danger"
        | "success"
        | "minimal";

    trackColor?: string;
    thumbColor?: string;
}

export default function Toggle({
    label = "",
    checked = false,
    onChange = () => {},
    className = "",
    variant = "default",
    trackColor = "bg-purple-600",
    thumbColor = "bg-white",
}: ToggleProps) {
    
    const variantClasses: Record<string, string> = {
        default: checked
            ? "bg-purple-600 text-white border-purple-600"
            : "bg-white text-gray-700 border-gray-200",

        outline: checked
            ? "border-purple-600 text-purple-600 bg-transparent"
            : "border-gray-300 text-gray-700 bg-transparent",

        soft: checked
            ? "bg-purple-100 text-purple-700 border-purple-200"
            : "bg-gray-100 text-gray-600 border-gray-200",

        solid: checked
            ? "bg-purple-700 text-white border-purple-700"
            : "bg-gray-300 text-gray-800 border-gray-300",

        glow: checked
            ? "bg-purple-600 text-white border-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.7)]"
            : "bg-gray-200 text-gray-700 border-gray-300",

        danger: checked
            ? "bg-red-600 text-white border-red-600"
            : "bg-red-100 text-red-600 border-red-200",

        success: checked
            ? "bg-green-600 text-white border-green-600"
            : "bg-green-100 text-green-700 border-green-200",

        minimal: "bg-transparent border-transparent text-gray-700 px-0 py-0",
    };

    return (
        <div
            onClick={() => onChange(!checked)}
            className={`flex items-center gap-2 cursor-pointer transition-all select-none ${variantClasses[variant]} ${className}`}
        >
            {/* Switch */}
            <div
                className={`
                    w-10 h-5 flex items-center rounded-full p-1 transition-all
                    ${checked ? trackColor + " justify-end" : "bg-gray-300 justify-start"}
                `}
            >
                <div
                    className={`w-4 h-4 rounded-full transition-all ${thumbColor}`}
                ></div>
            </div>

            {label && <span className="text-sm font-medium">{label}</span>}
        </div>
    );
}
