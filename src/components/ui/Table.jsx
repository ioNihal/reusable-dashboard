/**
 * Table Component
 * 
 * A flexible, responsive table component for displaying tabular data.
 * Supports custom column rendering, hover effects, and empty state messaging.
 * 
 * @component
 * @example
 * // Basic table
 * const columns = [
 *   { key: 'name', title: 'Name' },
 *   { key: 'email', title: 'Email' },
 *   { key: 'status', title: 'Status' },
 * ];
 * 
 * const data = [
 *   { name: 'John Doe', email: 'john@example.com', status: 'Active' },
 *   { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
 * ];
 * 
 * <Table columns={columns} data={data} />
 * 
 * @example
 * // With custom rendering
 * const columns = [
 *   { key: 'name', title: 'Name' },
 *   { 
 *     key: 'status', 
 *     title: 'Status',
 *     render: (row) => <Badge variant={row.status === 'Active' ? 'success' : 'default'}>{row.status}</Badge>
 *   },
 *   {
 *     key: 'actions',
 *     title: 'Actions',
 *     render: (row) => <Button onClick={() => handleEdit(row)}>Edit</Button>
 *   }
 * ];
 * 
 * <Table columns={columns} data={data} />
 * 
 * @param {Array} [columns=[]] - Array of column definitions
 *   - key: Unique identifier for the column
 *   - title: Display title for the column header
 *   - render: (Optional) Custom render function that receives the row data and returns JSX
 * @param {Array} [data=[]] - Array of row data objects
 * 
 * @returns {JSX.Element} A responsive table element with headers and rows
 */
export default function Table({ columns = [], data = [] }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="text-left text-sm font-semibold text-gray-700">
                        {columns.map((c) => (
                            <th key={c.key} className="px-4 py-3 text-xs font-semibold text-gray-600 tracking-wider">{c.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                {columns.map((c) => (
                                    <td key={c.key} className="px-4 py-3 text-sm text-gray-900">
                                        {c.render ? c.render(row) : row[c.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}