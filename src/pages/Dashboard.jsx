import Card from '../components/ui/Card'
import LineChart from '../components/charts/LineChart.jsx'
import { dashboardData } from '../data/dashboardData'
import useMockFetch from '../hooks/useMockFetch'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Table from '../components/ui/Table'
import { FaPlus } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'


export default function Dashboard() {
    const { data, loading } = useMockFetch(dashboardData)

    if (loading) return <div className="p-6">Loading dashboard...</div>

    // Recent scrapes table config
    const scrapeColumns = [
        { key: 'name', title: 'Scrape Name' },
        { key: 'account', title: 'Account' },
        { key: 'status', title: 'Status', render: (r) => <Badge variant={r.status === 'Completed' ? 'completed' : r.status === 'Running' ? 'running' : 'failed'}>{r.status}</Badge> },
        { key: 'emails', title: 'Emails' },
        { key: 'verified', title: 'Verified' },
        { key: 'date', title: 'Date' },
        { key: 'actions', title: 'Actions', render: () => <button className="text-gray-400 hover:text-gray-600 cursor-pointer"><HiDotsVertical /></button> },
    ]

    const scrapeData = [
        { name: 'Fashion influencers', account: '@fashiontrends', status: 'Completed', emails: 1234, verified: 892, date: '2 hours ago' },
        { name: 'Fashion influencers', account: '@fashiontrends', status: 'Running', emails: 1234, verified: 892, date: '2 hours ago' },
        { name: 'Fashion influencers', account: '@fashiontrends', status: 'Failed', emails: 1234, verified: 892, date: '2 hours ago' },
        { name: 'Fashion influencers', account: '@fashiontrends', status: 'Completed', emails: 1234, verified: 892, date: '2 hours ago' },
    ]

    return (
        <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen max-w-screen">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back! Here's what's happening with your business today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.stats.map((s) => (
                    <Card key={s.label} variant="default" className="px-4 py-3 flex flex-col gap-4 md:gap-3 justify-between">
                        <h2 className="text-gray-900 font-bold">{s.label}</h2>
                        <p className="text-blue-600 text-3xl font-semibold">{s.value}</p>
                        {s.action && <Badge variant="action">{s.action}</Badge>}
                    </Card>
                ))}
            </div>

            {/* Chart Section */}
            <Card variant="default" className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Scraped Emails</h2>
                        <p className="text-sm text-gray-500">Email scraping performance over time</p>
                    </div>
                    <Button variant="primary" size="md"><FaPlus />Start New Scrape</Button>
                </div>
                <LineChart data={data.trend} />
            </Card>

            {/* Recent Scrapes Table */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Recent Scrapes</h2>
                        <p className="text-sm text-gray-500">Latest scraping activities and their status</p>
                    </div>
                </div>
                <Card variant="default">
                    <div className="p-0">
                        <Table columns={scrapeColumns} data={scrapeData} />
                    </div>
                </Card>
            </div>
        </div>
    )
}