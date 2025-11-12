/**
 * Toast Component
 * 
 * A notification component that displays temporary messages to the user.
 * Automatically closes after a specified duration.
 * 
 * @component
 * @example
 * // Basic usage with state management
 * const [toast, setToast] = useState({ open: false, message: '' });
 * 
 * <Toast
 *   open={toast.open}
 *   message={toast.message}
 *   onClose={() => setToast({ open: false, message: '' })}
 * />
 * 
 * // Show toast
 * setToast({ open: true, message: 'Success! Changes saved.' });
 * 
 * @example
 * // With custom duration
 * <Toast
 *   open={isVisible}
 *   message="This will close in 3 seconds"
 *   onClose={handleClose}
 *   duration={3000}
 * />
 * 
 * @param {boolean} open - Controls whether the toast is visible
 * @param {string} [message=''] - The message text to display
 * @param {Function} [onClose] - Callback function called when the toast is closed or times out
 * @param {number} [duration=1800] - Duration in milliseconds before the toast auto-closes (default: 1.8s)
 * 
 * @returns {JSX.Element|null} A positioned toast notification element, or null if not open
 */
import React, { useEffect } from 'react'

export default function Toast({ open, message = '', onClose, duration = 1800 }) {
    useEffect(() => {
        if (!open) return
        const t = setTimeout(() => onClose && onClose(), duration)
        return () => clearTimeout(t)
    }, [open, onClose, duration])

    if (!open) return null

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg">
                {message}
            </div>
        </div>
    )
}
