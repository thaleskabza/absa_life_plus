// src/ui/Button.tsx
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

export default function Button({ 
  variant = 'primary', 
  size = 'md',
  pill = false, 
  fullWidth = false,
  icon,
  children,
  className = '',
  ...props 
}: ButtonProps) {
  
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
  
  return (
    <button className={classes} {...props}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}