

interface ProgressBarProps {
    progress?: number;
    statusText?: string;
    onCancel?: () => void;
    onPause?: () => void;
    showActions?: boolean;
}

export default function ProgressBar({
    progress = 0,
    statusText = "Processing...",
    onCancel,
    onPause,
    showActions = true,
}: ProgressBarProps) {
    // Clamp progress safely
    const clamped = Math.min(100, Math.max(0, progress));

    return (
        <div className="w-full p-4 bg-purple-50 rounded-lg border border-purple-100">

            {/* Status Text */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">{statusText}</p>
                <p className="text-sm font-semibold text-gray-900">{clamped}%</p>
            </div>

            {/* Progress Track */}
            <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                <div
                    className="h-full bg-purple-600 transition-all duration-300 ease-out"
                    style={{ width: `${clamped}%` }}
                ></div>
            </div>

            {/* Action Buttons */}
            {showActions && (
                <div className="flex items-center justify-end gap-3 mt-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-1.5 text-sm rounded-md border border-purple-600 text-purple-700 hover:bg-purple-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onPause}
                        className="px-4 py-1.5 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
                    >
                        Pause
                    </button>
                </div>
            )}
        </div>
    );
}
