// ========================================================================
// FILE: src/components/Button.jsx
// ========================================================================
import React from 'react';

const Button = ({ children, onClick, className, type = 'button' }) => {
  const baseStyles = "px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform transform hover:scale-105 duration-300";
  const defaultStyles = "bg-red-700 text-white hover:bg-red-800 focus:ring-red-500";
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${className || defaultStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;