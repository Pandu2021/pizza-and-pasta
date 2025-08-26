import React from 'react';
// Import images for the specialties section
import PastaImage from '../../assets/graphics/pasta/pasta - spag - chx parmesan cropped.jpg';
import PizzaImage from '../../assets/graphics/pizza/pizza - margherita.jpg';
import DessertImage from '../../assets/graphics/dessert/dessert - carrot cake - cropped.jpg';

function ContentSection() {
  const specialties = [
    {
      title: "Authentic Pasta",
      description: "Experience the true taste of Italy with our homemade pasta dishes, made from traditional family recipes.",
      image: PastaImage,
      alt: "A plate of authentic Italian pasta"
    },
    {
      title: "Gourmet Pizza",
      description: "Our pizzas are made with a crispy thin crust, topped with premium ingredients and baked to perfection.",
      image: PizzaImage,
      alt: "A delicious gourmet pizza"
    },
    {
      title: "Delicious Desserts",
      description: "End your meal on a sweet note with our selection of decadent desserts, from tiramisu to panna cotta.",
      image: DessertImage,
      alt: "A slice of delicious dessert"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 xl:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 font-bold md:text-4xl">Our Specialties</h2>
          <p className="mt-4 text-gray-600 lg:w-8/12 lg:mx-auto">
            From classic Italian pasta to our signature pizzas, every dish is crafted with love and the freshest ingredients.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {specialties.map((specialty, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img src={specialty.image} alt={specialty.alt} className="w-full h-56 object-cover"/>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800">{specialty.title}</h3>
                <p className="mt-4 text-gray-600">
                  {specialty.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentSection;
