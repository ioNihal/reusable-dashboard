import Button from "./Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";



type PageItem = number | "ellipsis";

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export default function Pagination({
    page,
    totalPages,
    onChange,
}: PaginationProps) {
    const maxVisible = 4;

    /** Typed range() helper */
    const range = (start: number, end: number): number[] => {
        const out: number[] = [];
        for (let i = start; i <= end; i++) out.push(i);
        return out;
    };

    /** Returns PageItem[] */
    const getPages = (): PageItem[] => {
        if (totalPages <= maxVisible) return range(1, totalPages);

        // Right ellipsis
        if (page <= maxVisible) {
            return [...range(1, maxVisible), "ellipsis"];
        }

        // Left ellipsis near end
        if (page > totalPages - maxVisible) {
            return ["ellipsis", ...range(totalPages - maxVisible + 1, totalPages)];
        }

        // Middle
        const half = Math.floor(maxVisible / 2);
        let start = page - half;
        let end = start + maxVisible - 1;

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

            {/* Prev */}
            <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => onChange(Math.max(1, page - 1))}
                className="disabled:opacity-50"
            >
                <IoIosArrowBack /> Prev
            </Button>

            {/* Pages */}
            {pages.map((num, idx) =>
                num === "ellipsis" ? (
                    <span key={`e-${idx}`} className="px-2 select-none">
                        …
                    </span>
                ) : (
                    <Button
                        key={`p-${num}`}
                        variant={page === num ? "accent" : "outline"}
                        size="sm"
                        onClick={() => onChange(num)}
                        className={`border-0 rounded-full! ${page === num ? "pointer-events-none" : ""
                            }`}
                    >
                        {num}
                    </Button>
                )
            )}

            {/* Next */}
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
