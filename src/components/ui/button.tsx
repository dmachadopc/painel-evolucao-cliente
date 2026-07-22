import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' | 'success';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', loading = false, disabled, children, ...props }, ref) => {

    // Custom cn helper to avoid dependency bloat
    const baseClass = "inline-flex items-center justify-center font-semibold text-xs rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-all duration-150 active:scale-[0.98] cursor-pointer";

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs border border-primary/20 font-bold",
      secondary: "bg-muted dark:bg-card text-muted-foreground dark:text-foreground hover:bg-primary/10 dark:hover:bg-primary/10 border border-border dark:border-border font-semibold",
      outline: "border border-border dark:border-border bg-card dark:bg-card text-muted-foreground dark:text-foreground hover:bg-primary/10 dark:hover:bg-primary/10 font-semibold shadow-2xs",
      ghost: "hover:bg-primary/10 dark:hover:bg-primary/10 text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-white font-medium",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs font-bold",
      success: "bg-success text-success-foreground hover:bg-success/90 font-bold shadow-xs border border-success/20",
      link: "text-primary underline-offset-4 hover:underline bg-transparent !p-0"
    };

    const sizes = {
      default: "h-9 px-4 py-2 text-xs",
      sm: "h-8 px-3 rounded-lg text-[11px]",
      lg: "h-11 px-6 rounded-lg text-sm font-bold",
      icon: "h-9 w-9 rounded-lg"
    };

    const variantClass = variants[variant];
    const sizeClass = sizes[size];
    const mergedClass = [baseClass, variantClass, sizeClass, className].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={mergedClass}
        {...props}
      >
        {loading && <Loader2 className="w-4.5 h-4.5 mr-2 animate-spin stroke-[1.75]" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
