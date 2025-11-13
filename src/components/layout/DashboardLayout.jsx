import { Outlet, useNavigate } from 'react-router-dom'
import { FaChartBar, FaPlus, FaEnvelope, FaCreditCard, FaCog } from 'react-icons/fa'
import Sidebar from './Sidebar'
import UpgradeBanner from '../ui/UpgradeBanner'
import UserProfile from '../ui/UserProfile'
import useSidebarToggle from '../../hooks/useSidebarToggle'
import Topbar from './Topbar'

export default function DashboardLayout() {
    const { isOpen, toggle } = useSidebarToggle()
    const navigate = useNavigate()

    // Menu configuration
    const mainMenu = [
        { name: 'Dashboard', path: '/', icon: <FaChartBar /> },
        { name: 'New Scrape', path: '/new', icon: <FaPlus /> },
        { name: 'Email Lists', path: '/results', icon: <FaEnvelope /> },
    ]

    const bottomMenu = [
        { name: 'Billing', path: '/billing', icon: <FaCreditCard /> },
        { name: 'Settings', path: '/settings', icon: <FaCog /> },
    ]

    // Optional: Custom theme configuration
    const sidebarTheme = {
        bgColor: 'bg-white',
        borderColor: 'border-gray-200',
        activeColor: 'text-blue-600',
        activeBg: 'bg-blue-50',
    }

    const handleUpgradeClick = () => {
        navigate('/billing');
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar
                isOpen={isOpen}
                toggleSidebar={toggle}
                mainMenu={mainMenu}
                bottomMenu={bottomMenu}
                upgradeBanner={<UpgradeBanner onUpgradeClick={handleUpgradeClick} />}
                userProfile={<UserProfile name="User Name" email="user@example.com" expanded={true} />}
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
    )
}