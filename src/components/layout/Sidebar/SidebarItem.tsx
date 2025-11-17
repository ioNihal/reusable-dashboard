import { useContext, type JSX } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../../../contexts/SidebarContext";


interface SidebarItemProps {
    icon: JSX.Element;
    text: string;
    path: string;
}

export default function SidebarItem({ icon, text, path }: SidebarItemProps) {
    const ctx = useContext(SidebarContext);
    if (!ctx) throw new Error("SidebarItem must be used inside SidebarContext");

    const { expanded, theme } = ctx;

    return (
        <li>
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `relative flex items-center ${expanded ? "" : "justify-center"
                    } px-3 py-2 font-medium rounded-md transition-colors group
          ${isActive
                        ? `${theme.activeBg} ${theme.activeColor} border-l-4 border-violet-600`
                        : `${theme.hoverBg} text-gray-700`
                    }`
                }
            >
                <span className="text-lg shrink-0">{icon}</span>

                <span
                    className={`overflow-hidden whitespace-nowrap ${expanded ? "w-52 ml-3" : "w-0"
                        }`}
                >
                    {text}
                </span>

                {!expanded && (
                    <div
                        className="
              absolute left-full px-2 py-1 ml-6 bg-gray-100 text-gray-900 
              text-sm rounded-md invisible opacity-0 -translate-x-3 
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
              whitespace-nowrap z-50
            "
                    >
                        {text}
                    </div>
                )}
            </NavLink>
        </li>
    );
}
