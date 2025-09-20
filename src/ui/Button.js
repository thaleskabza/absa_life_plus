import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/ui/Button.tsx
import React from 'react';
export default function Button({ variant = 'primary', size = 'md', pill = false, fullWidth = false, icon, children, className = '', ...props }) {
    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'btn-primary';
            case 'outline':
                return 'btn-outline';
            case 'ghost':
                return 'btn-ghost';
            case 'secondary':
                return 'btn-secondary';
            default:
                return 'btn-primary';
        }
    };
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'btn-sm';
            case 'lg':
                return 'btn-lg';
            default:
                return '';
        }
    };
    const classes = [
        'btn',
        getVariantClasses(),
        getSizeClasses(),
        pill ? 'btn-pill' : '',
        fullWidth ? 'full-width' : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("button", { className: classes, ...props, children: [icon && _jsx("span", { className: "btn-icon", children: icon }), children] }));
}
