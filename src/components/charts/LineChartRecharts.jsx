import React, { useState } from 'react'

function LineChartRecharts({ data = [] }) {
    const [hoveredIndex, setHoveredIndex] = useState(null)

    if (data.length === 0) {
        return <div className="w-full h-64 flex items-center justify-center text-gray-400">No data available</div>
    }

    // Format data
    const formatted = data.map((d, i) => ({ 
        name: d.label || `Day ${i + 1}`, 
        value: d.value 
    }))

    // Calculate dimensions
    const width = 900
    const height = 250
    const padding = { top: 20, right: 30, bottom: 40, left: 50 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Calculate min and max values
    const values = formatted.map(d => d.value)
    const maxValue = Math.max(...values)
    const minValue = Math.min(...values)
    const range = maxValue - minValue || maxValue

    // Scale functions
    const scaleX = (index) => padding.left + (index / (formatted.length - 1)) * chartWidth
    const scaleY = (value) => padding.top + chartHeight - ((value - minValue) / range) * chartHeight

    // Generate points for line
    const points = formatted.map((d, i) => ({
        x: scaleX(i),
        y: scaleY(d.value),
        ...d,
        index: i
    }))

    // Create path for line
    const pathData = points.map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`
        
        // Smooth curve using quadratic Bezier
        const prev = points[i - 1]
        const cp1x = prev.x + (p.x - prev.x) / 3
        const cp1y = prev.y
        const cp2x = prev.x + (p.x - prev.x) * 2 / 3
        const cp2y = p.y
        
        return `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p.x} ${p.y}`
    }).join(' ')

    // Create area path for gradient fill
    const areaPath = pathData + ` L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`

    // Y-axis grid lines and labels
    const gridLines = 5
    const gridValues = Array.from({ length: gridLines }, (_, i) => {
        const val = minValue + (range / (gridLines - 1)) * i
        return Math.round(val)
    })

    return (
        <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${width} ${height}`} style={{ minWidth: '100%', height: 'auto' }}>
                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                </defs>

                {/* Grid lines (horizontal) */}
                {gridValues.map((val, i) => (
                    <g key={`grid-${i}`}>
                        <line
                            x1={padding.left}
                            y1={padding.top + (chartHeight / (gridLines - 1)) * i}
                            x2={width - padding.right}
                            y2={padding.top + (chartHeight / (gridLines - 1)) * i}
                            stroke="#e5e7eb"
                            strokeDasharray="3 3"
                            strokeWidth="1"
                        />
                        <text
                            x={padding.left - 10}
                            y={padding.top + (chartHeight / (gridLines - 1)) * i + 4}
                            textAnchor="end"
                            fontSize="12"
                            fill="#6b7280"
                        >
                            {val}
                        </text>
                    </g>
                ))}

                {/* X-axis */}
                <line
                    x1={padding.left}
                    y1={padding.top + chartHeight}
                    x2={width - padding.right}
                    y2={padding.top + chartHeight}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                />

                {/* Area under line */}
                <path d={areaPath} fill="url(#chartGradient)" />

                {/* Line */}
                <path
                    d={pathData}
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Points and interactive areas */}
                {points.map((p, i) => (
                    <g key={`point-${i}`}>
                        {/* Circle dot */}
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r={hoveredIndex === i ? 5 : 3.5}
                            fill="#2563eb"
                            stroke="#fff"
                            strokeWidth="2"
                            className="transition-all duration-150"
                        />

                        {/* X-axis labels */}
                        <text
                            x={p.x}
                            y={padding.top + chartHeight + 20}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#6b7280"
                        >
                            {p.name}
                        </text>

                        {/* Invisible larger circle for hover detection */}
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r="15"
                            fill="transparent"
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{ cursor: 'pointer' }}
                            pointerEvents="auto"
                        />

                        {/* Tooltip on hover */}
                        {hoveredIndex === i && (
                            <g pointerEvents="none">
                                <rect
                                    x={p.x - 50}
                                    y={p.y - 60}
                                    width="100"
                                    height="50"
                                    rx="6"
                                    fill="#f3f4f6"
                                    stroke="#d1d5db"
                                    strokeWidth="1"
                                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                                />
                                <text
                                    x={p.x}
                                    y={p.y - 38}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fontWeight="600"
                                    fill="#1f2937"
                                >
                                    {p.name}
                                </text>
                                <text
                                    x={p.x}
                                    y={p.y - 18}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fontWeight="500"
                                    fill="#6b7280"
                                >
                                    <tspan>Email: </tspan>
                                    <tspan fill="#2563eb" fontWeight="600">{p.value}</tspan>
                                </text>
                            </g>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    )
}

export default React.memo(LineChartRecharts)