import { useState } from "react";
import SidebarItem from "./SidebarItem";
import type { SidebarProps } from "../../../types/sidebar";
import { SidebarContext } from "../../../contexts/SidebarContext";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Sidebar({
    isOpen,
    toggleSidebar,
    mainMenu = [],
    bottomMenu = [],
    upgradeBanner = null,
    userProfile = null,
    theme = {},
    expandedWidth = "w-64",
    collapsedWidth = "w-18",
}: SidebarProps) {
    const [expanded, setExpanded] = useState<boolean>(true);

    const finalTheme = {
        bgColor: "bg-white",
        borderColor: "border-gray-200",
        hoverBg: "hover:bg-gray-50",
        activeColor: "text-violet-600",
        activeBg: "bg-violet-100",
        ...theme,
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/10 md:hidden z-20"
                    onClick={() => {
                        setExpanded(true);
                        toggleSidebar();
                    }}
                />
            )}

            <aside
                className={`fixed md:static z-30 h-screen ${finalTheme.bgColor} border-r ${finalTheme.borderColor}
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                 ${expanded ? expandedWidth : collapsedWidth} `}>
                <nav className="flex flex-col h-full">
                    {/* HEADER */}
                    <div
                        className={`bg-white flex ${expanded ? "justify-between py-1 px-4" : "justify-center p-4"} 
                        items-center border-b ${finalTheme.borderColor}`}>
                        {expanded && (
                            <img src="/logo.svg" alt="Logo" className="h-13" />
                        )}

                        <button
                            onClick={() => {
                                if (window.innerWidth < 768) {
                                    // On mobile sidebar will be expanded
                                    // and toggle visibility instead of collapsing width.
                                    setExpanded(true);
                                    toggleSidebar();
                                    return;
                                }

                                // On larger screens just toggle collapsed state.
                                setExpanded((e) => !e);
                            }}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <IoIosArrowBack /> : <IoIosArrowForward />}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded, theme: finalTheme }}>
                        {/* MAIN MENU */}
                        {mainMenu.length > 0 && (
                            <ul className="flex-1 px-3 py-4 space-y-1">
                                {mainMenu.map((item) => (
                                    <SidebarItem
                                        key={item.path}
                                        icon={item.icon}
                                        text={item.name}
                                        path={item.path}
                                    />
                                ))}
                            </ul>
                        )}

                        {/* UPGRADE */}
                        {expanded && upgradeBanner && (
                            <div className="px-3 py-3 pt-8 border-t border-gray-200">
                                {upgradeBanner}
                            </div>
                        )}

                        {/* BOTTOM MENU */}
                        {bottomMenu.length > 0 && (
                            <ul className="px-3 py-3 border-t border-gray-200 space-y-1">
                                {bottomMenu.map((item) => (
                                    <SidebarItem
                                        key={item.path}
                                        icon={item.icon}
                                        text={item.name}
                                        path={item.path}
                                    />
                                ))}
                            </ul>
                        )}
                    </SidebarContext.Provider>

                    {/* USER PROFILE */}
                    {userProfile ? (
                        userProfile
                    ) : (
                        <div
                            className={`border-t ${finalTheme.borderColor} p-4 flex items-center gap-3`}
                        >
                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                                U
                            </div>

                            {expanded && (
                                <div className="min-w-0">
                                    <h4 className="font-semibold text-sm truncate">User Name</h4>
                                    <span className="text-xs text-gray-600 truncate block">
                                        user@example.com
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </aside>
        </>
    );
}
