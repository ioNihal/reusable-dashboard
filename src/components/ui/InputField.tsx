import { RxCheck, RxCross2 } from "react-icons/rx";
import type { InputFieldProps, InputVariant, MediaProps, SelectOption } from "../../types/inputField";
import { forwardRef } from "react";


const baseStyles: Record<InputVariant, string> = {
    default:
        "border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
    outline:
        "border-2 border-gray-400 bg-white focus:border-blue-600 focus:ring-0",
    shadow:
        "border border-gray-200 bg-white shadow-sm focus:shadow-lg focus:border-blue-500",
    custom: "",
};

const InputField = forwardRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    InputFieldProps
>(function InputField({
    label,
    type = "text",
    variant = "default",
    options = [],
    defaultSelect = "Select an option",
    error,
    success,
    disabled = false,
    className = "",
    ...props
}: InputFieldProps, ref) {
    const variantClasses = baseStyles[variant] || baseStyles.default;

    const stateClass = error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : success
            ? "border-green-500 focus:border-green-500 focus:ring-green-500"
            : disabled
                ? "opacity-60 cursor-not-allowed bg-gray-100"
                : "";

    const commonProps =
        `w-full rounded-md px-3 py-2 text-sm outline-none transition-all ` +
        `${variantClasses} ${stateClass} ${className}`;

    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-semibold text-gray-900">{label}</label>}

            {/* TEXTAREA */}
            {type === "textarea" && (
                <textarea
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    disabled={disabled}
                    className={commonProps}
                    rows={4}
                    {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                />
            )}

            {/* SELECT */}
            {type === "select" && (
                <select
                    ref={ref as React.Ref<HTMLSelectElement>}
                    disabled={disabled}
                    className={commonProps}
                    {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
                >
                    <option value="">{defaultSelect}</option>
                    {options.map((opt: SelectOption, index) => (
                        <option key={index} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            )}

            {/* MEDIA UPLOAD */}
            {type === "media" && (
                <div className="w-full">
                    {/* Hidden native file input */}
                    <input
                        ref={ref as React.Ref<HTMLInputElement>}
                        id={props.id}
                        type="file"
                        disabled={disabled}
                        className="hidden"
                        accept={
                            "accept" in props
                                ? (props as MediaProps).accept ?? "image/*,video/*"
                                : "image/*,video/*"
                        }
                        {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />

                    {/* Custom clickable upload button */}
                    <label
                        htmlFor={props.id}
                        className={commonProps +
                            " flex items-center gap-2 cursor-pointer"}>
                        {"icon" in props && props.icon}
                        <span className="text-gray-700 font-medium">
                            {"placeholder" in props
                                ? props.placeholder || "Click to upload media"
                                : "Click to upload media"}
                        </span>
                    </label>
                </div>
            )}



            {/* NORMAL INPUT TYPES */}
            {type !== "textarea" && type !== "select" && type !== "media" && (
                <input
                    ref={ref as React.Ref<HTMLInputElement>}
                    type={type}
                    disabled={disabled}
                    className={commonProps}
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                />
            )}

            {/* ERROR */}
            {error && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                    <RxCross2 /> {error}
                </p>
            )}

            {/* SUCCESS */}
            {success && (
                <p className="text-green-600 text-sm flex items-center gap-1">
                    <RxCheck /> {success}
                </p>
            )}
        </div>
    );
});

InputField.displayName = "InputField";

export default InputField;
