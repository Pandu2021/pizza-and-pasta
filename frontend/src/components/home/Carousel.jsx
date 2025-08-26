// src/components/home/Carousel.jsx
// Slider gambar otomatis dengan gambar-gambar yang bervariasi dan menarik.
// Setiap slide menampilkan aspek berbeda dari restoran, dari pizza hingga pasta.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Local images (use assets so CSP won't block external domains)
import pizzaImg from '../../assets/graphics/pizza/pizza - margherita.jpg';
import pastaImg from '../../assets/graphics/pasta/pasta - spag - chx parmesan cropped.jpg';
import dessertImg from '../../assets/graphics/dessert/dessert - carrot cake - cropped.jpg';

const slides = [
  {
    image: pizzaImg,
    title: 'Reach Out Today',
    text: 'Connect with us to discover how fresh, handcrafted ingredients transform a meal into an experience. Let our family bring a slice of Italy to your table with our unparalleled service and authentic cuisine',
  },
  {
    image: pastaImg,
    title: 'Savor Authentic Italy',
    text: 'Experience the extraordinary fusion of traditional Italian cuisine and contemporary flair with our vibrant homemade pizzas and pastas. Indge in culinary craftsmanship, savoring each of our uniquely textured, flavorful creations',
  },
  {
    image: dessertImg,
    title: 'Fresh Ingredients, Passionate Cooking',
    text: 'Our commitment to quality starts with the finest ingredients, handled with care by our passionate chefs to bring you an unforgettable dining experience.',
  }
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent(current === slides.length - 1 ? 0 : current + 1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center text-white p-8">
            <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
            <p className="max-w-3xl text-xl mb-8">{slide.text}</p>
            <Link to="/contact" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      ))}

      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75">&#10094;</button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75">&#10095;</button>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrent(index)} className={`w-3 h-3 rounded-full ${index === current ? 'bg-white' : 'bg-gray-400'}`}></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
