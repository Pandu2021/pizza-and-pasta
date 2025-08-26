import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ContentSection from '../components/home/ContentSection';
import Carousel from '../components/home/Carousel';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ContentSection />
      <Carousel />
    </div>
  );
};

export default HomePage;
