export type InputVariant = "default" | "outline" | "shadow" | "custom";

export type InputType =
    | "text"
    | "email"
    | "number"
    | "password"
    | "url"
    | "phone"
    | "textarea"
    | "select"
    | "media";

export interface SelectOption {
    label: string;
    value: string | number;
}

export interface BaseProps {
    label?: string;
    variant?: InputVariant;
    options?: SelectOption[];
    defaultSelect?: string;
    error?: string;
    success?: string;
    disabled?: boolean;
    className?: string;
}



export interface NormalInputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseProps {
    type?: Exclude<InputType, "textarea" | "select" | "media">;
}


export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseProps {
    type: "textarea";
}


export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement>,
    BaseProps {
    type: "select";
    options?: SelectOption[];
}


export interface MediaProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseProps {
    type: "media";
    accept?: string;
}


export type InputFieldProps =
    | NormalInputProps
    | TextareaProps
    | SelectProps
    | MediaProps;
