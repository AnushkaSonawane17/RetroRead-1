import React from 'react';

const Card = ({ 
  children, 
  className = '',
  hover = false,
  padding = 'p-6',
  shadow = 'shadow-lg',
  ...props 
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl 
        ${shadow}
        ${padding}
        ${hover && 'hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'}
        border border-gray-100
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;