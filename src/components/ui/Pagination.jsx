import Button from "./Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Pagination({ page, totalPages, onChange }) {
    const maxVisible = 4;

    const range = (start, end) => {
        const out = [];
        for (let i = start; i <= end; i++) out.push(i);
        return out;
    };

    const getPages = () => {
        // show all if small
        if (totalPages <= maxVisible) return range(1, totalPages);

        // right-ellipsis: show first block
        if (page <= maxVisible) {
            return [...range(1, maxVisible), "ellipsis"];
        }

        // left-ellipsis near end: show last block
        if (page > totalPages - maxVisible) {
            return ["ellipsis", ...range(totalPages - maxVisible + 1, totalPages)];
        }

        // middle: left-ellipsis + a block centered on current page
        // center the block so current page is visible
        const half = Math.floor(maxVisible / 2);
        let start = page - half;
        let end = start + maxVisible - 1;

        // adjust if start goes below 1 or end above totalPages
        if (start < 1) {
            start = 1;
            end = maxVisible;
        } else if (end > totalPages) {
            end = totalPages;
            start = totalPages - maxVisible + 1;
        }

        return ["ellipsis", ...range(start, end)];
    };

    const pages = getPages();

    return (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">

            {/* Prev button */}
            <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => onChange(Math.max(1, page - 1))}
                className="disabled:opacity-50"
            >
                <IoIosArrowBack /> Prev
            </Button>

            {/* Page buttons */}
            {pages.map((num, idx) =>
                num === "ellipsis" ? (
                    <span key={`e-${idx}`} className="px-2 select-none">…</span>
                ) : (
                    <Button
                        key={`p-${num}`}
                        variant={page === num ? "accent" : "outline"}
                        size="sm"
                        onClick={() => onChange(num)}
                        className={`border-0 rounded-full! ${page === num ? "pointer-events-none" : ""}`}
                    >
                        {num}
                    </Button>
                )
            )}

            {/* Next button */}
            <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => onChange(Math.min(totalPages, page + 1))}
                className="disabled:opacity-50"
            >
                Next <IoIosArrowForward />
            </Button>
        </div>
    );
}
