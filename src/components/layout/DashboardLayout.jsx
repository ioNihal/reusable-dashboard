import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import useSidebarToggle from '../../hooks/useSidebarToggle'
import Topbar from './Topbar'

export default function DashboardLayout() {
    const { isOpen, toggle } = useSidebarToggle()

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar isOpen={isOpen} toggleSidebar={toggle} />
            <div className="flex-1 flex flex-col">
                <Topbar onMenuClick={toggle} />
                <div className="flex-1 overflow-y-auto bg-white">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}