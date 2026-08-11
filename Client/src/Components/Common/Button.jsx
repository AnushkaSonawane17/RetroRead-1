import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = 'rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'bg-[#0984E3] text-white hover:bg-[#0873C7] shadow-lg shadow-blue-500/30',
    secondary: 'bg-[#00B894] text-white hover:bg-[#00A381] shadow-lg shadow-green-500/30',
    outline: 'border-2 border-[#0984E3] text-[#0984E3] hover:bg-[#0984E3] hover:text-white',
    danger: 'bg-[#E17055] text-white hover:bg-[#D63031] shadow-lg shadow-red-500/30',
    gradient: 'bg-gradient-to-r from-[#0984E3] to-[#6C5CE7] text-white hover:opacity-90 shadow-lg shadow-purple-500/30',
    ghost: 'text-[#2D3436] hover:bg-gray-100',
    warning: 'bg-[#FDCB6E] text-[#2D3436] hover:bg-[#FDCB6E]/80 shadow-lg shadow-yellow-500/30'
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-5 py-2.5 text-base',
    large: 'px-7 py-3.5 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth && 'w-full'}
        ${disabled && 'opacity-50 cursor-not-allowed hover:scale-100'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;