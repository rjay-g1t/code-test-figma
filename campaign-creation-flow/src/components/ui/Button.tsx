import React from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/lib/types';

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  disabled = false,
  loading = false,
  className,
}) => {
  const baseStyles =
    'px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-cheerful-gray text-white hover:bg-gray-800',
    secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    gradient:
      'bg-gradient-to-r from-cheerful-purple to-cheerful-orange text-white hover:opacity-90',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
