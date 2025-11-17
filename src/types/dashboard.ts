export interface DashboardStat {
    label: string;
    value: string | number;
    action?: string;
}

export interface TrendPoint {
    label: string;
    value: number;
}

export interface DashboardData {
    stats: DashboardStat[];
    trend: TrendPoint[];
}
