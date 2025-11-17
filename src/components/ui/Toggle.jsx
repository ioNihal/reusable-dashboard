export default function Toggle({
    label = "",
    checked = false,
    onChange = () => { },
    className = "",
}) {
    return (
        <div
            onClick={() => onChange(!checked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer border transition-all select-none
                    ${checked
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-gray-100 text-gray-700 border-gray-200"}  ${className}`}>
            {/* switch visual */}
            <div
                className={`w-10 h-5 flex items-center rounded-full p-1 transition-all
                            ${checked ? "bg-white justify-end" : "bg-gray-300 justify-start"}`}
            >
                <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>

            {label && <span className="text-sm font-medium">{label}</span>}
        </div>
    );
}
