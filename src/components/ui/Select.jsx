/**
 * Select Component
 * 
 * A dropdown select field with optional label and error handling.
 * Provides consistent styling and supports validation states.
 * 
 * @component
 * @example
 * // Basic select
 * <Select>
 *   <option value="">Choose an option</option>
 *   <option value="option1">Option 1</option>
 *   <option value="option2">Option 2</option>
 * </Select>
 * 
 * @example
 * // With label and error handling
 * const [selectedValue, setSelectedValue] = useState('');
 * const [error, setError] = useState('');
 * 
 * <Select
 *   label="Select a Category"
 *   value={selectedValue}
 *   onChange={(e) => setSelectedValue(e.target.value)}
 *   error={error}
 * >
 *   <option value="">Choose a category</option>
 *   <option value="category1">Category 1</option>
 *   <option value="category2">Category 2</option>
 * </Select>
 * 
 * @param {string} [label] - Optional label text displayed above the select
 * @param {string} [error] - Error message to display below the select. If provided, select styling changes to indicate error state
 * @param {React.ReactNode} children - Option elements to display in the dropdown
 * @param {Object} props - Standard HTML select attributes
 *   - value: Current selected value
 *   - onChange: Change handler callback
 *   - disabled: Disable the select
 *   - multiple: Allow multiple selection
 *   - and all other standard HTML select attributes
 * 
 * @returns {JSX.Element} A labeled select dropdown with optional error message
 */
export default function Select({ label, error, ...props }) {
    return (
        <label className="flex flex-col text-sm">
            {label && <span className="mb-2 text-gray-700 font-medium">{label}</span>}
            <select 
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