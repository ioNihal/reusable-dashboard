import { useEffect, useState } from "react";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";
import { FaFileCsv, FaFileExcel, FaSearch } from "react-icons/fa";
import Toggle from "../components/ui/Toggle";

export default function ScrapeHistory() {

    const [scrapeData, setScrapeData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [page, setPage] = useState(1);
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    // Fake pagination limit
    const perPage = 3;


    useEffect(() => {
        const data = [
            { id: 1, account: "@Travel", type: "Followings", totalEmails: 50, time: "2 hours ago", status: "completed" },
            { id: 2, account: "@sarah.design", type: "Followers", totalEmails: 100, time: "21 hours ago", status: "completed" },
            { id: 3, account: "@sarah.design", type: "Followers", totalEmails: 30, time: "2 days ago", status: "completed" },
            { id: 4, account: "@sarah.design", type: "Followers", totalEmails: "-", time: "5 days ago", status: "canceled" }
        ];

        setScrapeData(data);
        setIsEmpty(data.length === 0);
    }, []);


    // Fake pagination logic
    const totalPages = Math.ceil(scrapeData.length / perPage);
    const paginatedData = scrapeData.slice((page - 1) * perPage, page * perPage);


    const toggleRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };


    const bulkActionBar = selectedRows.length > 0 && (
        <div className="flex items-center gap-3">
            <Button variant="default" size="md" className="flex items-center gap-2">
                <FaFileCsv /> Export CSV
            </Button>

            <Button variant="outline" size="md" className="flex items-center gap-2">
                <FaFileExcel /> Export XLS
            </Button>
        </div>
    );


    const columns = [
        {
            key: "checkbox",
            title: "",
            render: (row) => (
                <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleRow(row.id)}
                />
            ),
        },
        {
            key: "account",
            title: "Account",
            render: (row) => (
                <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/30" className="w-7 h-7 rounded-full" />
                    <span>{row.account}</span>
                </div>
            ),
        },
        { key: "type", title: "Type" },
        { key: "totalEmails", title: "Total Email Scraped" },
        { key: "time", title: "Time" },
        {
            key: "status",
            title: "Status",
            render: (row) => (
                <Badge variant={row.status === "completed" ? "completed" : "failed"}>
                    {row.status === "completed" ? "Completed" : "Cancelled"}
                </Badge>
            ),
        },
        {
            key: "actions",
            title: "Export Emails List",
            hidden: selectedRows.length > 0,
            render: (row) =>
                selectedRows.length === 0 ? (
                    <div className="flex flex-col gap-2">
                        <Button variant="default" size="sm">
                            <FaFileCsv /> CSV
                        </Button>
                        <Button variant="outline" size="sm">
                            <FaFileExcel /> XLS
                        </Button>
                    </div>
                ) : null
        },
    ];

    return (
        <div className="p-6 space-y-6 max-w-screen">

            {/* Header + Bulk Actions */}
            <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Scrape History</h1>
                    <p className="text-gray-600">Manage your scraping history</p>
                </div>

                {!isEmpty && bulkActionBar}
            </div>


            {/* Search + Filters */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 mt-4">

                {/* Search input */}
                <div className="relative w-full sm:w-72">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg"><FaSearch /></span>
                    <InputField
                        type="text"
                        placeholder="Search by username, or type"
                        className="pl-10 bg-gray-100 border-gray-200 w-full"
                    />
                </div>

                {/* Verified Only Toggle */}
                <Toggle
                    label="Verified only"
                    checked={verifiedOnly}
                    onChange={setVerifiedOnly}
                    className="lg:ml-auto"
                />

                {/* Type Select */}
                <InputField
                    type="select"
                    className="bg-gray-100 border-gray-200"
                    options={[
                        { label: "All Type", value: "all" },
                        { label: "Followers", value: "followers" },
                        { label: "Followings", value: "followings" },
                    ]}
                />
            </div>


            {/* Empty State */}
            {isEmpty && (
                <div className="flex flex-col items-center mt-20 text-center">
                    <span className="text-gray-400 text-6xl">📄</span>
                    <p className="mt-4 text-lg font-semibold">No Email List Yet</p>
                    <p className="text-gray-500 mt-1">Get started by New Scrape.</p>

                    <Button className="mt-5 bg-linear-to-r from-purple-500 to-orange-400 text-white">
                        Start Scraping
                    </Button>
                </div>
            )}


            {/* Loaded */}
            {!isEmpty && (
                <>
                    <Card className="p-0">
                        <Table columns={columns} data={paginatedData} />
                    </Card>

                    {/* Pagination */}
                    <div className="flex justify-center gap-2 mt-6 flex-wrap">

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Prev
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button
                                key={i}
                                variant={page === i + 1 ? "primary" : "outline"}
                                size="sm"
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </Button>

                    </div>
                </>
            )}

        </div>
    );
}
