// ========================================================================
// FILE: src/components/home/HeroSection.jsx
// ========================================================================
import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/graphics/pizza/pizza - margherita.jpg';

const HeroSection = () => {
  return (
    <div className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          Authentic Italian Cuisine
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl">
          Experience the true taste of Italy with our handcrafted dishes, made from the freshest ingredients.
        </p>
        <Link to="/order">
            <Button>
                Order Now
            </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;