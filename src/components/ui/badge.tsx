import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'success-subtle' | 'warning' | 'warning-subtle' | 'destructive' | 'destructive-subtle' | 'info' | 'info-subtle' | 'outline';
  className?: string;
  children?: React.ReactNode;
}

export const Badge = ({ className = '', variant = 'default', ...props }: BadgeProps) => {
  const baseClass = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors duration-150";

  const variants = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    success: "border-transparent bg-success text-success-foreground",
    "success-subtle": "border-success/30 bg-success-subtle text-success-subtle-foreground",
    warning: "border-transparent bg-warning text-warning-foreground",
    "warning-subtle": "border-warning/30 bg-warning-subtle text-warning-subtle-foreground",
    destructive: "border-transparent bg-destructive text-destructive-foreground",
    "destructive-subtle": "border-destructive/30 bg-destructive-subtle text-destructive-subtle-foreground",
    info: "border-transparent bg-info text-info-foreground",
    "info-subtle": "border-info/30 bg-info-subtle text-info-subtle-foreground",
    outline: "border-border text-foreground"
  };

  const variantClass = variants[variant];
  const mergedClass = [baseClass, variantClass, className].filter(Boolean).join(' ');

  return (
    <div
      className={mergedClass}
      {...props}
    />
  );
};
