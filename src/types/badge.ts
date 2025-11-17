export type BadgeVariant =
    | "default"
    | "completed"
    | "running"
    | "pending"
    | "failed"
    | "action";

export interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    variant?: BadgeVariant;
}
