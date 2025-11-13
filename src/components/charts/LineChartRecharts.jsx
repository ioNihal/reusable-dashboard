import React, { useState, useMemo } from 'react'

/**
 * LineChartRecharts Component
 * A custom SVG-based line chart with smooth curves, gradient fill, and interactive tooltips.
 * 
 * @param {Object} props
 * @param {Array<{label: string, value: number}>} [props.data=[]] - Chart data
 * @param {number} [props.width=900] - SVG width in pixels
 * @param {number} [props.height=250] - SVG height in pixels
 * @param {Object} [props.padding={top: 20, right: 30, bottom: 40, left: 50}] - Inner padding
 * @param {string} [props.lineColor='#2563eb'] - Line stroke color
 * @param {string} [props.gradientColor='#2563eb'] - Gradient fill color
 * @param {number} [props.gridLines=5] - Number of Y-axis grid lines
 * @param {string} [props.tooltipLabel='Email'] - Label for tooltip value
 * @param {string} [props.emptyMessage='No data available'] - Empty state message
 */
function LineChartRecharts({
    data = [],
    width = 900,
    height = 250,
    padding = { top: 20, right: 30, bottom: 40, left: 50 },
    lineColor = '#2563eb',
    gradientColor = '#2563eb',
    gridLines = 5,
    tooltipLabel = 'Email',
    emptyMessage = 'No data available',
}) {
    const [hoveredIndex, setHoveredIndex] = useState(null)

    // Memoized calculations - placed before early return
    const { points, pathData, areaPath, gridValues, chartWidth, chartHeight } = useMemo(() => {
        // Format data
        const formatted = data.map((d, i) => ({
            name: d.label || `Day ${i + 1}`,
            value: d.value,
        }))

        const chartWidth = width - padding.left - padding.right
        const chartHeight = height - padding.top - padding.bottom

        // Calculate min and max values
        const values = formatted.map((d) => d.value)
        const maxValue = Math.max(...values)
        const minValue = Math.min(...values)
        const range = maxValue - minValue || maxValue

        // Scale functions
        const scaleX = (index) => padding.left + (index / (formatted.length - 1)) * chartWidth
        const scaleY = (value) => padding.top + chartHeight - ((value - minValue) / range) * chartHeight

        // Generate points
        const points = formatted.map((d, i) => ({
            x: scaleX(i),
            y: scaleY(d.value),
            ...d,
            index: i,
        }))

        // Create SVG path for line with smooth Bezier curves
        const pathData = points
            .map((p, i) => {
                if (i === 0) return `M ${p.x} ${p.y}`

                const prev = points[i - 1]
                const cp1x = prev.x + (p.x - prev.x) / 3
                const cp1y = prev.y
                const cp2x = prev.x + (p.x - prev.x) * (2 / 3)
                const cp2y = p.y

                return `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p.x} ${p.y}`
            })
            .join(' ')

        // Create area path for gradient fill
        const areaPath =
            pathData +
            ` L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`

        // Y-axis grid values
        const gridValues = Array.from({ length: gridLines }, (_, i) => {
            const val = minValue + (range / (gridLines - 1)) * i
            return Math.round(val)
        })

        return { points, pathData, areaPath, gridValues, chartHeight }
    }, [data, width, height, padding, gridLines])

    if (data.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center text-gray-400">
                {emptyMessage}
            </div>
        )
    }

    return (
        <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${width} ${height}`} style={{ minWidth: '100%', height: 'auto' }}>
                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={gradientColor} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={gradientColor} stopOpacity={0} />
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
                    stroke={lineColor}
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
                            r={hoveredIndex === p.index ? 5 : 3.5}
                            fill={lineColor}
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
                            onMouseEnter={() => setHoveredIndex(p.index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{ cursor: 'pointer' }}
                            pointerEvents="auto"
                        />

                        {/* Tooltip on hover */}
                        {hoveredIndex === p.index && (
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
                                    <tspan>{tooltipLabel}: </tspan>
                                    <tspan fill={lineColor} fontWeight="600">{p.value}</tspan>
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