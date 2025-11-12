// src/components/charts/BarChart.jsx
import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function SimpleBarChart({ data = [] }) {
    const formatted = data.map((d, i) => ({ name: d.label || `#${i + 1}`, value: d.value }))

    return (
        <div className="w-full h-64">
            <ResponsiveContainer>
                <BarChart data={formatted} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
