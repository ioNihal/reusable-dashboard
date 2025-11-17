export interface UpgradeBannerProps {
    title?: string;
    buttonText?: string;
    onUpgradeClick?: () => void;
    iconColor?: string;
    iconBgColor?: string;
    buttonVariant?: "primary" | "secondary" | "outline" | "danger" | "success" | "accent";
    buttonSize?: "sm" | "md" | "lg" | "full";
}
