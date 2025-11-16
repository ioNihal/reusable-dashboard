import { useEffect, useState } from "react";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";
import { FaFileCsv, FaFileExcel, FaSearch } from "react-icons/fa";
import Toggle from "../components/ui/Toggle";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Pagination from "../components/ui/Pagination";

export default function ScrapeHistory() {

    const [scrapeData, setScrapeData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [page, setPage] = useState(1);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [search, setSearch] = useState("");


    useEffect(() => {
        const data = [
            { id: 1, account: "@mike.travel", type: "Followings", totalEmails: 42, time: "3 hours ago", status: "completed" },
            { id: 2, account: "@design.with.sarah", type: "Followers", totalEmails: 120, time: "1 hour ago", status: "completed" },
            { id: 3, account: "@crypto.akshay", type: "Followers", totalEmails: 18, time: "2 days ago", status: "completed" },
            { id: 4, account: "@nature.vision", type: "Followings", totalEmails: "-", time: "5 days ago", status: "canceled" },

            { id: 5, account: "@foodiesam", type: "Followers", totalEmails: 95, time: "4 hours ago", status: "completed" },
            { id: 6, account: "@tech.arjun", type: "Followings", totalEmails: 63, time: "12 hours ago", status: "completed" },
            { id: 7, account: "@minimal.jane", type: "Followers", totalEmails: 27, time: "3 days ago", status: "completed" },
            { id: 8, account: "@john.travel", type: "Followings", totalEmails: 88, time: "30 min ago", status: "completed" },

            { id: 9, account: "@artist.riya", type: "Followers", totalEmails: 150, time: "19 hours ago", status: "completed" },
            { id: 10, account: "@marketingguru", type: "Followers", totalEmails: 12, time: "2 days ago", status: "completed" },
            { id: 11, account: "@sam.codes", type: "Followings", totalEmails: 44, time: "1 day ago", status: "completed" },
            { id: 12, account: "@travel.karthik", type: "Followings", totalEmails: 76, time: "6 hours ago", status: "completed" },

            { id: 13, account: "@uiux.lara", type: "Followers", totalEmails: 103, time: "21 hours ago", status: "completed" },
            { id: 14, account: "@cars.freak", type: "Followers", totalEmails: 9, time: "5 days ago", status: "completed" },
            { id: 15, account: "@workout.max", type: "Followings", totalEmails: 30, time: "1 day ago", status: "completed" },
            { id: 16, account: "@fashion.maya", type: "Followers", totalEmails: "-", time: "4 days ago", status: "canceled" },

            { id: 17, account: "@doctor.lena", type: "Followers", totalEmails: 80, time: "2 hours ago", status: "completed" },
            { id: 18, account: "@cyber.pranav", type: "Followings", totalEmails: 55, time: "10 hours ago", status: "completed" },
            { id: 19, account: "@vlogs.manish", type: "Followers", totalEmails: 37, time: "3 days ago", status: "completed" },
            { id: 20, account: "@gaming.adi", type: "Followers", totalEmails: "-", time: "6 days ago", status: "canceled" },

            { id: 21, account: "@science.neha", type: "Followings", totalEmails: 92, time: "9 hours ago", status: "completed" },
            { id: 22, account: "@cooking.radhika", type: "Followers", totalEmails: 101, time: "16 hours ago", status: "completed" },
            { id: 23, account: "@himalayan.trek", type: "Followings", totalEmails: 14, time: "2 days ago", status: "completed" },
            { id: 24, account: "@finance.shreya", type: "Followers", totalEmails: 66, time: "7 hours ago", status: "completed" },

            { id: 25, account: "@camera.dev", type: "Followers", totalEmails: 130, time: "1 hour ago", status: "completed" },
            { id: 26, account: "@petlover.anu", type: "Followers", totalEmails: 25, time: "3 days ago", status: "completed" },
            { id: 27, account: "@sky.observer", type: "Followings", totalEmails: 49, time: "8 hours ago", status: "completed" },
            { id: 28, account: "@coding.sachu", type: "Followers", totalEmails: 114, time: "12 hours ago", status: "completed" },

            { id: 29, account: "@music.dev", type: "Followers", totalEmails: 39, time: "2 days ago", status: "completed" },
            { id: 30, account: "@bot.design", type: "Followers", totalEmails: "-", time: "5 days ago", status: "canceled" },
            { id: 31, account: "@travel.rio", type: "Followings", totalEmails: 57, time: "4 hours ago", status: "completed" },
        ];


        setScrapeData(data);
        setIsEmpty(data.length === 0);
    }, []);



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
                        <Button onClick={() => console.log(row)} variant="default" size="sm">
                            <FaFileCsv /> CSV
                        </Button>
                        <Button onClick={() => console.log(row)} variant="outline" size="sm">
                            <FaFileExcel /> XLS
                        </Button>
                    </div>
                ) : null
        },
    ];



    const filteredData = scrapeData.filter(item => {
        const query = search.toLowerCase();

        return (
            item.account.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query) ||
            String(item.totalEmails).includes(query) ||
            item.status.toLowerCase().includes(query)
        );
    });

    const perPage = 5;
    const totalPages = Math.ceil(filteredData.length / perPage);
    const paginatedData = filteredData.slice((page - 1) * perPage, page * perPage);


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
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
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


            {filteredData.length <= 0 && (
                <div className="flex flex-col items-center mt-20 text-center">
                    <span className="text-gray-400 text-6xl">📄</span>
                    <p className="mt-4 text-lg font-semibold">Coudnt find what you asked</p>
                    <p className="text-gray-500 mt-1">Try a New Scrape.</p>

                    <Button className="mt-5 bg-linear-to-r from-purple-500 to-orange-400 text-white">
                        Start Scraping
                    </Button>
                </div>
            )}

            {/* Loaded */}
            {filteredData.length > 0 && (
                <>
                    <Card className="p-0">
                        <Table columns={columns} data={paginatedData} />
                    </Card>

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onChange={setPage}
                    />
                </>
            )}


        </div>
    );
}
