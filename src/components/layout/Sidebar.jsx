
import { NavLink } from 'react-router-dom'
import { useContext, createContext, useState } from 'react'
import { FaChartBar, FaPlus, FaEnvelope, FaCreditCard, FaCog } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


const mainMenu = [
    { name: 'Dashboard', path: '/', icon: <FaChartBar /> },
    { name: 'New Scrape', path: '/new', icon: <FaPlus /> },
    { name: 'Email Lists', path: '/results', icon: <FaEnvelope /> },
];


const bottomMenu = [
    { name: 'Billing', path: '/billing', icon: <FaCreditCard /> },
    { name: 'Settings', path: '/settings', icon: <FaCog /> },
];

const SidebarContext = createContext()

export default function Sidebar({ isOpen, toggleSidebar }) {
    const [expanded, setExpanded] = useState(true)

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/10 backdrop-blur-xs md:hidden z-10"
                    onClick={toggleSidebar}
                />
            )}
            <aside
                className={`fixed md:static z-20 h-screen bg-white border-r border-gray-200 transition-all duration-300 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    ${expanded ? 'w-64' : 'w-20'}`}
            >
                <nav className="h-full flex flex-col">
                    {/* Header with toggle button */}
                    <div className="p-4 flex justify-between items-center border-b border-gray-200">
                        {expanded && <h2 className="text-lg font-bold truncate">IGScraping</h2>}
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 shrink-0 ml-auto md:ml-0"
                        >
                            {expanded ? <IoIosArrowBack /> : <IoIosArrowForward />}
                        </button>
                    </div>

                    {/* Main menu */}
                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3 py-4 space-y-1">
                            {mainMenu.map((m) => (
                                <SidebarItem
                                    key={m.path}
                                    icon={m.icon}
                                    text={m.name}
                                    path={m.path}
                                />
                            ))}
                        </ul>

                        {/* Upgrade section */}
                        {expanded && (
                            <div className="px-3 py-3 border-t border-gray-200 space-y-3">
                                <p className="text-xs text-gray-500">Pick a plan to start scraping and closing deals</p>
                                <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                                    Upgrade Plan
                                </button>
                            </div>
                        )}

                        {/* Bottom menu */}
                        <ul className="px-3 py-3 border-t border-gray-200 space-y-1">
                            {bottomMenu.map((m) => (
                                <SidebarItem
                                    key={m.path}
                                    icon={m.icon}
                                    text={m.name}
                                    path={m.path}
                                />
                            ))}
                        </ul>
                    </SidebarContext.Provider>

                    {/* User profile at bottom */}
                    <div className="border-t border-gray-200 p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            U
                        </div>
                        {expanded && (
                            <div className="overflow-hidden transition-all min-w-0">
                                <h4 className="font-semibold text-sm truncate">User Name</h4>
                                <span className="text-xs text-gray-600 truncate block">user@example.com</span>
                            </div>
                        )}
                    </div>
                </nav>
            </aside>
        </>
    )
}

function SidebarItem({ icon, text, path }) {
    const { expanded } = useContext(SidebarContext)

    return (
        <li>
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `relative flex items-center px-3 py-2 font-medium rounded-md cursor-pointer transition-colors group
                    ${isActive
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`
                }
            >
                <span className="text-lg shrink-0">{icon}</span>
                <span
                    className={`overflow-hidden transition-all whitespace-nowrap ${
                        expanded ? 'w-52 ml-3' : 'w-0'
                    }`}
                >
                    {text}
                </span>

                {!expanded && (
                    <div
                        className={`
                            absolute left-full rounded-md px-2 py-1 ml-6
                            bg-gray-100 text-gray-900 text-sm font-medium
                            invisible opacity-0 -translate-x-3 transition-all
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-50
                        `}
                    >
                        {text}
                    </div>
                )}
            </NavLink>
        </li>
    )
}