import { FaUser, FaEnvelope, FaCheckCircle, FaFileCsv, FaFileExcel, FaCheck } from "react-icons/fa";
import Card from "./Card";
import Badge from "./Badge";
import Button from "./Button";

export default function ScrapeResultCard({
  account = "@unknown",
  type = "Followings",
  totalEmails = 0,
  verifiedEmails = 0,
  status = "completed", // completed | running | pending | failed
  onExportCSV,
  onExportXLS,
}) {
  return (
    <Card className="py-4 px-6 flex flex-col gap-6">

      {/* top SECTION */}
      <div className="flex flex-wrap lg:flex-nowrap lg:items-center justify-between 2xl:justify-start gap-5 2xl:gap-30">

        {/* Account */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <FaUser /> Account
          </span>
          <p className="text-xs font-semibold text-gray-900">{account}</p>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <FaEnvelope /> Type
          </span>
          <p className="text-xs font-semibold text-gray-900">{type}</p>
        </div>

        {/* Total Email Scraped */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <FaEnvelope /> Total Email Scraped
          </span>
          <p className="text-xs font-semibold text-gray-900">{totalEmails}</p>
        </div>

        {/* Verified Emails */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <FaCheckCircle /> Verified Emails
          </span>
          <p className="text-xs font-semibold text-gray-900">{verifiedEmails}</p>
        </div>
      </div>

      {/* bottom SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">

        {/* Status Badge */}
        <Badge variant={status} className="inline-flex items-center gap-2">
          <FaCheck /> Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>

        {/* Export CSV */}
        <Button
          variant="default"
          size="sm"
          onClick={onExportCSV}
          className="flex items-center gap-2 lg:ml-auto"
        >
          <FaFileCsv /> Export CSV
        </Button>

        {/* Export XLS */}
        <Button
          variant="outline"
          size="sm"
          onClick={onExportXLS}
          className="flex items-center gap-2"
        >
          <FaFileExcel /> Export XLS
        </Button>
      </div>

    </Card>
  );
}
