import React from 'react';
type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    pill?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
}
export default function Button({ variant, size, pill, fullWidth, icon, children, className, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
