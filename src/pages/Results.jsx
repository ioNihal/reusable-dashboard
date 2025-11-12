import { useState } from 'react'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { scrapeResults } from '../data/scrapeResults'
import useMockFetch from '../hooks/useMockFetch'
import Toast from '../components/ui/Toast'
import { FaDownload, FaFileExcel, FaSearch, FaClipboard, FaCheck } from 'react-icons/fa'

export default function Results() {
    const { data, loading } = useMockFetch(scrapeResults)
    const [toast, setToast] = useState({ open: false, message: '' })

    const handleCopy = async (email) => {
        try {
            await navigator.clipboard.writeText(email)
            setToast({ open: true, message: `Copied ${email}` })
        } catch {
            setToast({ open: true, message: 'Copy failed' })
        }
    }

    if (loading) return <div className="p-6">Loading results...</div>

    // Get first result for summary (if any)
    const firstResult = data && data.length > 0 ? data[0] : null

    const columns = [
        {
            key: 'account',
            title: 'Account',
            render: (r) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {r.account.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{r.account}</span>
                </div>
            ),
        },
        { key: 'email', title: 'Email' },
        { key: 'followers', title: 'Followers' },
        { key: 'following', title: 'Following', render: (r) => r.following || '-' },
        {
            key: 'verified',
            title: 'Verified',
            render: (r) => (r.verified ? <FaCheck className="text-green-600" /> : '-'),
        },
        {
            key: 'status',
            title: 'Status',
            render: (r) => (
                <Badge variant={r.status === 'Completed' ? 'completed' : r.status === 'Pending' ? 'pending' : 'running'}>
                    {r.status}
                </Badge>
            ),
        },
        {
            key: 'actions',
            title: 'Actions',
            render: (r) => (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(r.email)}
                    className="text-xs"
                >
                    Copy Email
                </Button>
            ),
        },
    ]

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Scrape Email Lists</h1>
                    <p className="text-gray-500">Manage your scraping email lists</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="primary" size="sm"><FaDownload /> Export CSV</Button>
                    <Button variant="primary" size="sm"><FaFileExcel /> Export XLS</Button>
                </div>
            </div>

            {/* Summary Section */}
            {firstResult && (
                <Card variant="light" className="p-4 border border-blue-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <div className="text-xs text-gray-600 font-medium">Account</div>
                            <div className="text-sm font-semibold text-gray-900">@{firstResult.account}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-600 font-medium">Type</div>
                            <div className="text-sm font-semibold text-gray-900">Followings</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-600 font-medium">Total Email Scraped</div>
                            <div className="text-sm font-semibold text-gray-900">500</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-600 font-medium">Verified Emails</div>
                            <div className="text-sm font-semibold text-gray-900">12</div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Badge variant="success"><FaCheck /> Status: Completed</Badge>
                    </div>
                </Card>
            )}

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-3 items-end">
                <div className="flex-1">
                    <Input placeholder="Search by username, or email" icon={<FaSearch />} />
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" onChange={() => {}} />
                    <span className="text-gray-700">Verified emails only</span>
                </label>
                <Select>
                    <option value="">Sort by Username</option>
                    <option value="email">Sort by Email</option>
                    <option value="status">Sort by Status</option>
                </Select>
            </div>

            {/* Empty State or Table */}
            {(!data || data.length === 0) ? (
                <Card variant="default" className="p-12 text-center">
                    <div className="text-6xl mb-4 flex justify-center"><FaClipboard /></div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Email List Yet</h3>
                    <p className="text-gray-500 mb-6">Get started by New Scrape.</p>
                    <Button variant="primary">Start Scraping</Button>
                </Card>
            ) : (
                <>
                    <Card variant="default" className="p-0">
                        <Table columns={columns} data={data} />
                    </Card>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <button className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">‹ Previous</button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded font-medium">1</button>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">2</button>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">3</button>
                        <span className="text-gray-500">...</span>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">4</button>
                        <button className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">Next ›</button>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        Showing 1 of 5 of 10 results
                    </div>
                </>
            )}

            <Toast
                open={toast.open}
                message={toast.message}
                onClose={() => setToast({ open: false, message: '' })}
            />
        </div>
    )
}
