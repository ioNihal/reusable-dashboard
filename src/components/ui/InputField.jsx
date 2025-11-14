import { RxCheck, RxCross2 } from "react-icons/rx";

const baseStyles = {
  default:
    "border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  outline:
    "border-2 border-gray-400 bg-white focus:border-blue-600 focus:ring-0",
  shadow:
    "border border-gray-200 bg-white shadow-sm focus:shadow-lg focus:border-blue-500",
  custom: ""
};

export default function InputField({
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
}) {
  const variantClasses = baseStyles[variant] || baseStyles.default;


  const stateClass =
    error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : success
      ? "border-green-500 focus:border-green-500 focus:ring-green-500"
      : disabled
      ? "opacity-60 cursor-not-allowed bg-gray-100"
      : "";

  const commonProps = `
    w-full rounded-md px-3 py-2 text-sm outline-none transition-all
    ${variantClasses} ${stateClass} ${className}
  `;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold text-gray-900">{label}</label>}

      {/* TEXTAREA */}
      {type === "textarea" && (
        <textarea disabled={disabled} className={commonProps} rows={4} {...props}></textarea>
      )}

      {/* SELECT */}
      {type === "select" && (
        <select disabled={disabled} className={commonProps} {...props}>
          <option value="">{defaultSelect}</option>
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* MEDIA */}
      {type === "media" && (
        <input
          type="file"
          disabled={disabled}
          className={commonProps + " cursor-pointer"}
          accept={props.accept || "image/*,video/*"}
          {...props}
        />
      )}

      {/* NORMAL INPUTS */}
      {type !== "textarea" && type !== "select" && type !== "media" && (
        <input disabled={disabled} type={type} className={commonProps} {...props} />
      )}

      
      {error && (
        <p className="text-red-600 text-sm flex items-center gap-1">
          <span><RxCross2 /></span>{error}
        </p>
      )}

      {success && (
        <p className="text-green-600 text-sm flex items-center gap-1">
          <span><RxCheck /></span>{success}
        </p>
      )}
    </div>
  );
}
