import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'


function LineChartRecharts({ data = [] }) {
    // expects data: [{ label, value }, ...]
    const formatted = data.map((d, i) => ({ name: d.label || `#${i + 1}`, value: d.value }))


    return (
        <div className="w-full h-64">
            <ResponsiveContainer>
                <LineChart data={formatted} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default React.memo(LineChartRecharts)