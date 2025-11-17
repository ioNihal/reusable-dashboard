import { createContext } from "react";
import type { SidebarTheme } from "../types/sidebar";


export interface SidebarContextValue {
    expanded: boolean;
    theme: SidebarTheme;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);
