/**
 * Card Component
 * 
 * A container component for grouping content with consistent styling and spacing.
 * Supports multiple visual variants for different visual hierarchy and emphasis.
 * 
 * @component
 * @example
 * // Basic card
 * <Card>
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
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
 * @param {string} [variant='default'] - The style variant to use
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
        elevated: 'bg-white shadow-md rounded-lg',
    }
    
    const variantClass = variants[variant] || variants.default
    return (
        <div className={`${variantClass} ${className}`}>
            {children}
        </div>
    )
}