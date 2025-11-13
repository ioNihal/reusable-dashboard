/**
 * Badge Component
 * 
 * A flexible badge component for displaying labels, status indicators, or tags.
 * Supports multiple variants for different use cases.
 * 
 * @component
 * @example
 * // Basic usage
 * <Badge>New</Badge>
 * 
 * @example
 * // With variant
 * <Badge variant="completed">✓ Completed</Badge>
 * <Badge variant="pending">⏳ Pending</Badge>
 * <Badge variant="failed">✗ Failed</Badge>
 * 
 * @param {React.ReactNode} children - The content to display inside the badge
 * @param {string} [className=''] - Additional CSS classes to apply
 * @param {string} [variant='default'] - The style variant to use
 *   - 'default': Gray background, suitable for neutral status
 *   - 'completed': Green background, for completed/success states
 *   - 'running': Blue background, for active/in-progress states
 *   - 'pending': Yellow background, for pending/warning states
 *   - 'failed': Red background, for error/failed states
 *   - 'action': Light blue background, for actionable items
 * 
 * @returns {JSX.Element} A styled span element
 */
export default function Badge({ children, className = '', variant = 'default' }) {
    const variants = {
        default: 'bg-gray-200 text-gray-800',
        completed: 'bg-green-100 text-green-700 border border-green-300',
        running: 'bg-blue-100 text-blue-700 border border-blue-300',
        pending: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
        failed: 'bg-red-100 text-red-700 border border-red-300',
        action: 'bg-blue-50 text-blue-600 border border-blue-100',
    }

    const variantClass = variants[variant] || variants.default
    return <span className={`inline-block w-max px-3 py-1 text-xs font-medium rounded-sm 
        ${variantClass} ${className}`}>{children}</span>
}