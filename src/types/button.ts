export type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "success"
    | "accent";

export type ButtonSize = "sm" | "md" | "lg" | "full";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    hideInMobile?: boolean;
    className?: string;
}
