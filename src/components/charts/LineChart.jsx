// src/components/charts/LineChart.jsx
// Lightweight compatibility wrapper: re-export the Recharts-based line chart
import LineChartRecharts from './LineChartRecharts.jsx'

export default function LineChart(props) {
  return <LineChartRecharts {...props} />
}
