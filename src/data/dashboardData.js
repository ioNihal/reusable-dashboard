// src/data/dashboardData.js
// Minimal dashboard data used by src/pages/Dashboard.jsx
export const dashboardData = {
  stats: [
    { label: 'Users', value: 1240 },
    { label: 'New Leads', value: 84 },
    { label: 'Conversions', value: 32 },
    { label: 'Revenue', value: '$12.3k' },
  ],
  // trend: an array expected by LineChartRecharts ({ label, value })
  trend: [
    { label: 'Jan', value: 20 },
    { label: 'Feb', value: 45 },
    { label: 'Mar', value: 60 },
    { label: 'Apr', value: 40 },
    { label: 'May', value: 75 },
    { label: 'Jun', value: 90 },
  ],
}
