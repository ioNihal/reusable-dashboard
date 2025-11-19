import React, { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

export type ActionItem = {
    key: string;
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    danger?: boolean;
};

interface ActionMenuProps {
    items: ActionItem[];
    buttonClassName?: string;
    menuClassName?: string;
}

export default function ActionMenu({ items, buttonClassName = "", menuClassName = "" }: ActionMenuProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("click", onDoc);
        return () => document.removeEventListener("click", onDoc);
    }, []);

    return (
        <div className="relative inline-block" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 ${buttonClassName}`}
                aria-expanded={open}
                aria-haspopup="menu"
            >
                <HiDotsVertical />
            </button>

            {open && (
                <div className={`absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-40 ${menuClassName}`}>
                    {items.map((it) => (
                        <button
                            key={it.key}
                            type="button"
                            onClick={() => {
                                try {
                                    it.onClick();
                                } finally {
                                    setOpen(false);
                                }
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 ${it.danger ? "text-red-600" : "text-gray-700"}`}
                        >
                            {it.icon}
                            {it.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
