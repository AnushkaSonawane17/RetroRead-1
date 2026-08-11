import React, { useState } from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  className = '',
  required = false,
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#2D3436] mb-1.5">
          {label}
          {required && <span className="text-[#E17055] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636E72]">
            {icon}
          </div>
        )}
        <input
          type={isPassword && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-lg border 
            focus:outline-none focus:ring-2 focus:ring-[#0984E3] focus:border-transparent
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-[#E17055] focus:ring-[#E17055]' : 'border-gray-200'}
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#636E72] hover:text-[#2D3436]"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-[#E17055]">{error}</p>
      )}
    </div>
  );
};

export default Input;