
import { NavLink } from 'react-router-dom'
import { useContext, createContext, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const SidebarContext = createContext()

/**
 * Sidebar Component - Reusable navigation sidebar
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Mobile visibility state
 * @param {Function} props.toggleSidebar - Mobile toggle handler
 * @param {Array} props.mainMenu - Main menu items [{name, path, icon}]
 * @param {Array} props.bottomMenu - Bottom menu items [{name, path, icon}]
 * @param {React.ReactNode} props.upgradeBanner - Custom upgrade banner content
 * @param {React.ReactNode} props.userProfile - Custom user profile section
 * @param {Object} props.theme - Custom theme object
 * @param {string} props.expandedWidth - Width when expanded (default: 'w-64')
 * @param {string} props.collapsedWidth - Width when collapsed (default: 'w-18')
 * @param {string} props.headerTitle - Header title text (default: 'Menu')
 */
export default function Sidebar({
    isOpen,
    toggleSidebar,
    mainMenu = [],
    bottomMenu = [],
    upgradeBanner = null,
    userProfile = null,
    theme = {},
    expandedWidth = 'w-64',
    collapsedWidth = 'w-18',
    headerTitle = 'Menu',
}) {
    const [expanded, setExpanded] = useState(true)

    // Set default theme values
    const finalTheme = {
        bgColor: 'bg-white',
        borderColor: 'border-gray-200',
        hoverBg: 'hover:bg-gray-50',
        activeColor: 'text-blue-600',
        activeBg: 'bg-blue-50',
        ...theme,
    }

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/10 md:hidden z-10"
                    onClick={toggleSidebar}
                />
            )}
            <aside
                className={`fixed md:static z-20 h-screen ${finalTheme.bgColor} border-r ${finalTheme.borderColor} 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    ${expanded ? expandedWidth : collapsedWidth}`}
            >
                <nav className="h-full flex flex-col overflow-auto overflow-x-hidden lg:overflow-hidden">
                    {/* Header */}
                    <div className={`bg-white flex ${expanded ? 'justify-between p-4' : 'justify-center p-4'} items-center border-b ${finalTheme.borderColor}`}>
                        {expanded && <h2 className="text-lg font-bold truncate">{headerTitle}</h2>}
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className={`p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 shrink-0`}
                            aria-label="Toggle sidebar"
                        >
                            {expanded ? <IoIosArrowBack /> : <IoIosArrowForward />}
                        </button>
                    </div>

                    {/* Main menu */}
                    <SidebarContext.Provider value={{ expanded, theme: finalTheme }}>
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

                        {/* Upgrade banner */}
                        {expanded && upgradeBanner && (
                            <div className="px-3 py-3 pt-8 border-t border-gray-200">
                                {upgradeBanner}
                            </div>
                        )}

                        {/* Bottom menu */}
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

                    {/* User profile */}
                    {userProfile ? (
                        userProfile
                    ) : (
                        <div className={`border-t ${finalTheme.borderColor} p-4 flex items-center justify-center gap-3`}>
                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                U
                            </div>
                            {expanded && (
                                <div className="overflow-hidden min-w-0">
                                    <h4 className="font-semibold text-sm truncate">User Name</h4>
                                    <span className="text-xs text-gray-600 truncate block">user@example.com</span>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </aside>
        </>
    )
}

function SidebarItem({ icon, text, path }) {
    const { expanded, theme } = useContext(SidebarContext)

    return (
        <li>
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `relative flex items-center ${expanded ? '' : 'justify-center'} px-3 py-2 font-medium rounded-md cursor-pointer transition-colors group
                    ${isActive
                        ? `${theme?.activeBg || 'bg-blue-50'} ${theme?.activeColor || 'text-blue-600'} border-l-4 border-blue-600`
                        : `${theme?.hoverBg || 'hover:bg-gray-50'} text-gray-700`
                    }`
                }
            >
                <span className="text-lg shrink-0">{icon}</span>
                <span
                    className={`overflow-hidden whitespace-nowrap ${expanded ? 'w-52 ml-3' : 'w-0'}`}
                >
                    {text}
                </span>

                {!expanded && (
                    <div
                        className={`
                            absolute left-full rounded-md px-2 py-1 ml-6
                            bg-gray-100 text-gray-900 text-sm font-medium
                            invisible opacity-0 -translate-x-3 
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