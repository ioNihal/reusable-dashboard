/**
 * Card Component
 * 
 * A container component for grouping content with consistent styling and spacing.
 * Supports multiple visual variants for different visual hierarchy and emphasis.
 * 
 * @component
 * @example
 * // Basic card with stat display
 * <Card>
 *   <h2 className="text-gray-900 text-sm font-semibold">Total Scrapes</h2>
 *   <p className="text-blue-600 text-4xl font-bold mt-3">12,000</p>
 *   <button className="mt-3 px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
 *     Action
 *   </button>
 * </Card>
 * 
 * @example
 * // With variant
 * <Card variant="light">
 *   <p>Light background card</p>
 * </Card>
 * 
 * <Card variant="elevated">
 *   <p>Elevated card with more shadow</p>
 * </Card>
 * 
 * @param {React.ReactNode} children - The content to display inside the card
 * @param {string} [className=''] - Additional CSS classes to apply
 * @param {'default' | 'light' | 'elevated'} [variant='default'] - The style variant to use
 *   - 'default': White background with subtle border and light shadow
 *   - 'light': Light blue background, useful for highlighting or emphasis
 *   - 'elevated': White background with stronger shadow for elevated appearance
 * 
 * @returns {JSX.Element} A styled div element
 */
export default function Card({ children, className = '', variant = 'default' }) {
    const variants = {
        default: 'bg-white shadow-sm border border-gray-200 rounded-lg',
        light: 'bg-blue-50 border border-blue-100 rounded-lg',
        elevated: 'bg-white shadow-lg rounded-lg',
    }
    
    const variantClass = variants[variant] || variants.default
    return (
        <div className={`${variantClass} ${className}`}>
            {children}
        </div>
    )
}