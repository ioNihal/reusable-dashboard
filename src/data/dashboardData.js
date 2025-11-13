// src/data/dashboardData.js
// Minimal dashboard data used by src/pages/Dashboard.jsx
export const dashboardData = {
  stats: [
    { label: 'Total Scrapes', value: "12,000", action: "Action" },
    { label: 'Verified Emails', value: "9,000" },
    { label: 'Running Jobs', value: "3" },
    { label: 'Credits Remaining', value: '1,500' },
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
