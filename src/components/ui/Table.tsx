import type { TableProps } from "../../types/table";

export default function Table<RowType extends Record<string, any>>({
    columns = [],
    data = [],
}: TableProps<RowType>) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="text-left text-sm font-semibold text-gray-700">
                        {columns.map((c) =>
                            c.hidden ? null : (
                                <th
                                    key={String(c.key)}
                                    className="px-4 py-3 text-xs font-semibold text-gray-600 tracking-wider"
                                >
                                    {c.title}
                                </th>
                            )
                        )}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                {columns.map((c) => {
                                    if (c.hidden) return null;

                                    return (
                                        <td
                                            key={String(c.key)}
                                            className="px-4 py-3 text-sm text-gray-900"
                                        >
                                            {c.render
                                                ? c.render(row)
                                                : (row as any)[c.key]}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
