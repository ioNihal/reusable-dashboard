
const baseStyles = {
  default:
    "border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  outline:
    "border-2 border-gray-400 bg-white focus:border-blue-600 focus:ring-0",
  shadow:
    "border border-gray-200 bg-white shadow-sm focus:shadow-lg focus:border-blue-500",
  custom: ` `
};

export default function InputField({
  label,
  type = "text",
  variant = "default",
  options = [],
  defaultSelect = "Select an option",
  className = "",
  ...props
}) {
  const variantClasses = baseStyles[variant] || baseStyles.default;

  const commonProps =
    "w-full rounded-md px-3 py-2 text-sm outline-none transition-all " +
    variantClasses +
    " " +
    className;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      {/* Textarea */}
      {type === "textarea" && (
        <textarea className={commonProps} rows={4} {...props}></textarea>
      )}

      {/* Select */}
      {type === "select" && (
        <select className={commonProps} {...props}>
          <option value="default">{defaultSelect}</option>
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* File / Media Upload */}
      {type === "media" && (
        <input
          type="file"
          className={commonProps + " cursor-pointer"}
          accept={props.accept || "image/*, video/*"}
          {...props}
        />
      )}

      {/* Regular Inputs */}
      {type !== "textarea" &&
        type !== "select" &&
        type !== "media" && (
          <input type={type} className={commonProps} {...props} />
        )}
    </div>
  );
}
