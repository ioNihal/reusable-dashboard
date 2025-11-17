import { type JSX, type ReactNode } from "react";

export interface MenuItem {
    name: string;
    path: string;
    icon: JSX.Element;
}

export interface SidebarTheme {
    bgColor?: string;
    borderColor?: string;
    hoverBg?: string;
    activeColor?: string;
    activeBg?: string;
}

export interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    mainMenu?: MenuItem[];
    bottomMenu?: MenuItem[];
    upgradeBanner?: ReactNode;
    userProfile?: ReactNode;
    theme?: SidebarTheme;
    expandedWidth?: string;
    collapsedWidth?: string;
    headerTitle?: string;
}
