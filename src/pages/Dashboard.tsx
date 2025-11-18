import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import LineChart from "../components/ui/charts/LineChart";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

import { dashboardData, type DashboardData } from "../data/dashboardData";
import useMockFetch from "../hooks/useMockFetch";
import type { Column } from "../types/table";

type ScrapeRow = {
    name: string;
    account: string;
    status: "Completed" | "Running" | "Failed";
    emails: number;
    verified: number;
    date: string;
};

export default function Dashboard() {
    const navigate = useNavigate();

    const { data, loading } = useMockFetch<DashboardData>(dashboardData);

    const handleStartNewScrape = () => navigate("/new");

    // Table column definitions
    const scrapeColumns: Column<ScrapeRow>[] = useMemo(
        () => [
            { key: "name", title: "Scrape Name" },
            { key: "account", title: "Account" },
            {
                key: "status",
                title: "Status",
                render: (row) => (
                    <Badge
                        variant={
                            row.status === "Completed"
                                ? "completed"
                                : row.status === "Running"
                                    ? "running"
                                    : "failed"
                        }
                    >
                        {row.status}
                    </Badge>
                ),
            },
            { key: "emails", title: "Emails" },
            { key: "verified", title: "Verified" },
            { key: "date", title: "Date" },
            {
                key: "actions",
                title: "Actions",
                render: () => (
                    <button className="text-gray-400 hover:text-gray-600">
                        <HiDotsVertical />
                    </button>
                ),
            },
        ],
        []
    );

    const scrapeData: ScrapeRow[] = [
        { name: "Fashion influencers", account: "@fashiontrends", status: "Completed", emails: 1234, verified: 892, date: "2 hours ago" },
        { name: "Fashion influencers", account: "@fashiontrends", status: "Running", emails: 1234, verified: 892, date: "2 hours ago" },
        { name: "Fashion influencers", account: "@fashiontrends", status: "Failed", emails: 1234, verified: 892, date: "2 hours ago" },
        { name: "Fashion influencers", account: "@fashiontrends", status: "Completed", emails: 1234, verified: 892, date: "2 hours ago" },
    ];

    return (
        <div className="p-4 md:p-6 space-y-6 bg-purple-50 min-h-screen max-w-screen">

            {/* Header */}
            <header>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm md:text-base">
                    Welcome back! Here&apos;s what&apos;s happening today.
                </p>
            </header>

            {/* Loading */}
            {loading ? (
                <div className="w-full h-64 flex items-center justify-center">
                    <div className="relative w-12 h-12 animate-bounce">
                        <div className="absolute inset-0 border-4 border-blue-400 rounded-full opacity-40"></div>
                        <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Stats */}
                    <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data?.stats.map((s) => (
                            <Card key={s.label} className="px-4 py-3 flex flex-col justify-between gap-3">
                                <h2 className="text-gray-900 font-bold">{s.label}</h2>
                                <p className="text-[#8134AF] text-3xl font-semibold">{s.value}</p>
                                {s.action && <Badge variant="action">{s.action}</Badge>}
                            </Card>
                        ))}
                    </section>

                    {/* Chart */}
                    <Card className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Scraped Emails</h2>
                                <p className="text-sm text-gray-500">Email scraping performance over time</p>
                            </div>
                            <Button variant="primary" size="md" onClick={handleStartNewScrape}>
                                <FaPlus /> Start New Scrape
                            </Button>
                        </div>
                        <LineChart data={data?.trend ?? []} />
                    </Card>

                    {/* Recent Scrapes */}
                    <Card className="p-4 space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
                            <div className="mb-3">
                                <h2 className="text-lg font-bold text-gray-900">Recent Scrapes</h2>
                                <p className="text-sm text-gray-500">Latest scraping activity & status</p>
                            </div>
                            <Button variant="primary" size="md" onClick={handleStartNewScrape}>
                                <FaPlus /> Start New Scrape
                            </Button>
                        </div>

                        <Card className="p-0">
                            <Table<ScrapeRow> columns={scrapeColumns} data={scrapeData} />
                        </Card>
                    </Card>
                </>
            )}
        </div>
    );
}
