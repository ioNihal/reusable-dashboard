import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const variants = {
  success: "bg-green-50 border border-green-300 text-green-800",
  error: "bg-red-50 border border-red-300 text-red-800",
  warning: "bg-yellow-50 border border-yellow-300 text-yellow-800",
  info: "bg-blue-50 border border-blue-300 text-blue-800",
};

const icons = {
  success: <FaCheckCircle className="text-green-600 text-lg" />,
  error: <FaTimesCircle className="text-red-600 text-lg" />,
  warning: <FaExclamationTriangle className="text-yellow-600 text-lg" />,
  info: <FaInfoCircle className="text-blue-600 text-lg" />,
};

export default function Toast({ title, message, variant }) {
  return (
    <div className={`
        w-80 p-4 rounded-md shadow-sm flex items-start gap-3 animate-fade-in
        ${variants[variant]}
      `}
    >
      <div className="mt-1">{icons[variant]}</div>

      <div className="flex flex-col">
        <span className="font-semibold text-sm">{title}</span>
        <span className="text-xs opacity-70">{message}</span>
      </div>
    </div>
  );
}
