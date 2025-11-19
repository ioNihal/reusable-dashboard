import React, { useState, useMemo } from "react";

interface ChartDataItem {
    label: string;
    value: number;
}

interface Padding {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

interface Point {
    x: number;
    y: number;
    value: number;
    name: string;
    index: number;
}

interface MemoResult {
    points: Point[];
    pathData: string;
    areaPath: string;
    gridValues: number[];
    chartHeight: number;
}

interface LineChartProps {
    data?: ChartDataItem[];
    width?: number;
    height?: number;
    padding?: Padding;
    lineColor?: string;
    gradientColor?: string;
    gridLines?: number;
    tooltipLabel?: string;
    tooltipFillColor?: string;
    tooltipTitleColor?: string;
    tooltipBodyColor?: string;
    emptyMessage?: string;
}

function LineChart({
    data = [],
    width = 900,
    height = 250,
    padding = { top: 20, right: 30, bottom: 40, left: 50 },
    lineColor = "#8134AFCC",
    gradientColor = "#8134AFCC",
    gridLines = 5,
    tooltipLabel = "Email",
    emptyMessage = "No data available",
    tooltipFillColor = "#E9D5FF",
    tooltipTitleColor = "#1f2937",
    tooltipBodyColor = "#6b7280",
}: LineChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const { points, pathData, areaPath, gridValues, chartHeight } = useMemo<
        MemoResult
    >(() => {
        const formatted = data.map((d, i) => ({
            name: d.label || `Day ${i + 1}`,
            value: d.value,
        }));

        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        const values = formatted.map((d) => d.value);
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const range = maxValue - minValue || maxValue;

        const scaleX = (index: number) =>
            padding.left + (index / (formatted.length - 1)) * chartWidth;

        const scaleY = (value: number) =>
            padding.top + chartHeight - ((value - minValue) / range) * chartHeight;

        const points: Point[] = formatted.map((d, i) => ({
            x: scaleX(i),
            y: scaleY(d.value),
            name: d.name,
            value: d.value,
            index: i,
        }));

        const pathData = points
            .map((p, i) => {
                if (i === 0) return `M ${p.x} ${p.y}`;
                const prev = points[i - 1]!;
                const cp1x = prev.x + (p.x - prev.x) / 3;
                const cp1y = prev.y;
                const cp2x = prev.x + ((p.x - prev.x) * 2) / 3;
                const cp2y = p.y;
                return `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p.x} ${p.y}`;
            })
            .join(" ");

        const areaPath =
            pathData +
            ` L ${points[points.length - 1].x} ${padding.top + chartHeight
            } L ${points[0].x} ${padding.top + chartHeight} Z`;

        const gridValues = Array.from({ length: gridLines }, (_, i) =>
            Math.round(minValue + (range / (gridLines - 1)) * i)
        ).sort((a, b) => b - a);

        return { points, pathData, areaPath, gridValues, chartHeight };
    }, [data, width, height, padding, gridLines]);

    if (data.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center text-gray-400">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                style={{ minWidth: "100%", height: "auto" }}
            >
                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop
                            offset="0%"
                            stopColor={gradientColor}
                            stopOpacity={0.3}
                        />
                        <stop offset="100%" stopColor={gradientColor} stopOpacity={0} />
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                {gridValues.map((val, i) => (
                    <g key={`grid-${i}`}>
                        <line
                            x1={padding.left}
                            y1={padding.top + (chartHeight / (gridLines - 1)) * i}
                            x2={width - padding.right}
                            y2={padding.top + (chartHeight / (gridLines - 1)) * i}
                            stroke="#e5e7eb"
                            strokeDasharray="3 3"
                            strokeWidth={1}
                        />
                        <text
                            x={padding.left - 10}
                            y={padding.top + (chartHeight / (gridLines - 1)) * i + 4}
                            textAnchor="end"
                            fontSize={12}
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
                    strokeWidth={1}
                />

                {/* Area */}
                <path d={areaPath} fill="url(#chartGradient)" />

                {/* Line */}
                <path
                    d={pathData}
                    stroke={lineColor}
                    strokeWidth={2.5}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Points */}
                {points.map((p) => (
                    <g key={`point-${p.index}`}>
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r={hoveredIndex === p.index ? 5 : 3.5}
                            fill={lineColor}
                            stroke="#fff"
                            strokeWidth={2}
                            className="transition-all duration-150"
                        />

                        <text
                            x={p.x}
                            y={padding.top + chartHeight + 20}
                            textAnchor="middle"
                            fontSize={12}
                            fill="#6b7280"
                        >
                            {p.name}
                        </text>

                        <circle
                            cx={p.x}
                            cy={p.y}
                            r={15}
                            fill="transparent"
                            onMouseEnter={() => setHoveredIndex(p.index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{ cursor: "pointer" }}
                        />

                        {hoveredIndex === p.index && (
                            <g pointerEvents="none">
                                        <rect
                                            x={p.x - 50}
                                            y={p.y - 60}
                                            width={100}
                                            height={50}
                                            rx={6}
                                            fill={tooltipFillColor}
                                            stroke="#d1d5db"
                                            strokeWidth={1}
                                        />
                                <text
                                    x={p.x}
                                    y={p.y - 38}
                                    textAnchor="middle"
                                    fontSize={12}
                                    fontWeight={600}
                                    fill={tooltipTitleColor}
                                >
                                    {p.name}
                                </text>
                                <text
                                    x={p.x}
                                    y={p.y - 18}
                                    textAnchor="middle"
                                    fontSize={12}
                                    fontWeight={500}
                                    fill={tooltipBodyColor}
                                >
                                    <tspan>{tooltipLabel}: </tspan>
                                    <tspan fill={lineColor} fontWeight={600}>
                                        {p.value}
                                    </tspan>
                                </text>
                            </g>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}

export default React.memo(LineChart);
