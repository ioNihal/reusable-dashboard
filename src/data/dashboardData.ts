export interface DashboardStat {
    label: string;
    value: string;
    action?: string;
}

export interface DashboardTrendPoint {
    label: string;
    value: number;
}

export interface DashboardData {
    stats: DashboardStat[];
    trend: DashboardTrendPoint[];
}

export const dashboardData: DashboardData = {
    stats: [
        { label: "Total Scrapes", value: "12,000", action: "Action" },
        { label: "Verified Emails", value: "9,000" },
        { label: "Running Jobs", value: "3" },
        { label: "Credits Remaining", value: "1,500" },
    ],
    trend: [
        { label: "Jan", value: 20 },
        { label: "Feb", value: 45 },
        { label: "Mar", value: 60 },
        { label: "Apr", value: 40 },
        { label: "May", value: 75 },
        { label: "Jun", value: 90 },
    ],
};
