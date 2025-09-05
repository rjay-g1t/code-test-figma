import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Gradient border ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cheerful-purple via-cheerful-orange to-cheerful-purple animate-spin-slow">
        <div className="absolute inset-1 bg-white rounded-full"></div>
      </div>

      {/* Cheerful logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-gradient-to-br from-cheerful-purple to-cheerful-orange rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">C</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
