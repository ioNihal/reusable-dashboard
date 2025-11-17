import { Outlet, useNavigate } from "react-router-dom";
import { FaCreditCard, FaCog } from "react-icons/fa";
import Sidebar from "./Sidebar/Sidebar";
import UpgradeBanner from "../ui/UpgradeBanner";
import useSidebarToggle from "../../hooks/useSidebarToggle";
import Topbar from "./Topbar";
import { PiFilePlus } from "react-icons/pi";
import { BiHomeAlt } from "react-icons/bi";
import { MdHistory } from "react-icons/md";
import type { MenuItem, SidebarTheme } from "../../types/sidebar";
import UserProfile from "../ui/UserProfile";


export default function DashboardLayout() {
    const { isOpen, toggle } = useSidebarToggle();
    const navigate = useNavigate();

    // MAIN MENU (typed)
    const mainMenu: MenuItem[] = [
        { name: "Dashboard", path: "/", icon: <BiHomeAlt /> },
        { name: "New Scrape", path: "/new", icon: <PiFilePlus /> },
        { name: "Scrape History", path: "/history", icon: <MdHistory /> },
    ];

    // BOTTOM MENU (typed)
    const bottomMenu: MenuItem[] = [
        { name: "Billing", path: "/billing", icon: <FaCreditCard /> },
        { name: "Settings", path: "/settings", icon: <FaCog /> },
    ];

    // Optional theme (typed)
    const sidebarTheme: SidebarTheme = {
        bgColor: "bg-white",
        borderColor: "border-gray-200",
        activeColor: "text-[#8134AF]",
        activeBg: "bg-violet-50",
    };

    const handleUpgradeClick = () => {
        navigate("/billing");
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 isolate">
            <Sidebar
                isOpen={isOpen}
                toggleSidebar={toggle}
                mainMenu={mainMenu}
                bottomMenu={bottomMenu}
                upgradeBanner={
                    <UpgradeBanner onUpgradeClick={handleUpgradeClick} />
                }
                userProfile={
                    <UserProfile name="User Name" email="user@example.com" expanded={true} />
                }
                theme={sidebarTheme}
                expandedWidth="w-64"
                collapsedWidth="w-18"
                headerTitle="Menu"
            />

            <div className="flex-1 flex flex-col">
                <Topbar onMenuClick={toggle} />

                <div className="flex-1 overflow-y-auto bg-white">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
