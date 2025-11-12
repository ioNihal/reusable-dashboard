/**
 * Input Component
 * 
 * A controlled text input field with optional label and error handling.
 * Provides consistent styling and supports validation states.
 * 
 * @component
 * @example
 * // Basic input
 * <Input placeholder="Enter your name" />
 * 
 * @example
 * // With label and error handling
 * const [email, setEmail] = useState('');
 * const [error, setError] = useState('');
 * 
 * <Input
 *   label="Email Address"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={error}
 *   placeholder="user@example.com"
 * />
 * 
 * @param {string} [label] - Optional label text displayed above the input
 * @param {string} [error] - Error message to display below the input. If provided, input styling changes to indicate error state
 * @param {Object} props - Standard HTML input attributes
 *   - type: Input type (text, email, password, number, etc.)
 *   - placeholder: Placeholder text
 *   - value: Current input value
 *   - onChange: Change handler callback
 *   - disabled: Disable the input
 *   - required: Mark as required
 *   - and all other standard HTML input attributes
 * 
 * @returns {JSX.Element} A labeled input field with optional error message
 */
export default function Input({ label, error, ...props }) {
    return (
        <label className="flex flex-col text-sm">
            {label && <span className="mb-2 text-gray-700 font-medium">{label}</span>}
            <input 
                className={`border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 transition-all ${
                    error 
                        ? 'border-red-300 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
                }`}
                {...props} 
            />
            {error && <span className="mt-1 text-xs text-red-600">{error}</span>}
        </label>
    )
}