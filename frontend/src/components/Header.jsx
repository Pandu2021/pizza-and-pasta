// ========================================================================
// FILE: src/components/Header.jsx
// ========================================================================
import React from 'react';

const Header = ({ title, subtitle }) => {
  return (
    <header className="bg-red-800 text-white text-center py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-2">{title}</h1>
        <p className="text-xl text-red-100">{subtitle}</p>
      </div>
    </header>
  );
};

export default Header;