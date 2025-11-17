/**
 * Button Component
 * 
 * A versatile button component with multiple variants and sizes.
 * Supports various visual styles for different use cases and user interactions.
 * 
 * @component
 * @example
 * // Basic button
 * <Button>Click Me</Button>
 * 
 * @example
 * // With variant and size
 * <Button variant="primary" size="lg">Large Primary Button</Button>
 * <Button variant="secondary" size="sm">Small Secondary Button</Button>
 * <Button variant="danger">Delete</Button>
 * 
 * @example
 * // With icon
 * <Button>
 *   <FaDownload /> Download
 * </Button>
 * 
 * @param {React.ReactNode} children - The content to display inside the button
 * @param {'primary' | 'secondary' | 'outline' | 'danger' | 'success'} [variant='primary'] - The style variant to use
 *   - 'primary': Blue background, for main actions
 *   - 'secondary': Gray background, for secondary actions
 *   - 'outline': Bordered style, for tertiary actions
 *   - 'danger': Red background, for destructive actions
 *   - 'success': Green background, for positive actions
 * @param {'sm' | 'md' | 'lg' | 'full'} [size='md'] - The size of the button
 *   - 'sm': Small button (text-xs, px-3 py-1)
 *   - 'md': Medium button (text-sm, px-4 py-2)
 *   - 'lg': Large button (text-base, px-6 py-3)
 *   - 'full': Full width button (w-full)
 * @param {boolean} [hideInMobile=false] - Whether to hide the button on mobile screens
 * @param {string} [className=''] - Additional CSS classes to apply
 * @param {Object} props - Standard HTML button attributes (onClick, disabled, type, etc.)
 * 
 * @returns {JSX.Element} A styled button element
 */
export default function Button({ children, variant = 'primary', size = '', hideInMobile = false, className = '', ...props }) {
    const base = 'rounded-md font-medium transition-all items-center justify-center gap-2 cursor-pointer'
    const sizes = {
        sm: 'px-3 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        full: 'w-full px-4 py-2 text-base',
    }
    const variants = {
        primary: 'bg-linear-to-r from-[#F58529] via-[#DD2A7B] via-[#8134AF] to-[#515BD4] text-white hover:opacity-90',
        secondary: 'bg-[#EBAE00] text-white hover:bg-yellow-600',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 ',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-500 text-white hover:bg-green-600',
        accent: 'bg-purple-600 text-white hover:bg-purple-600',
    }

    const sizeClass = sizes[size] || sizes.md
    const variantClass = variants[variant] || variants.primary

    return (
        <button className={`${base} ${sizeClass} ${variantClass} ${hideInMobile ? "hidden md:inline-flex" : "inline-flex"} ${className}`} {...props}>
            {children}
        </button>
    )
}