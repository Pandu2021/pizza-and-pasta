// ========================================================================
// FILE: src/pages/RecipesGalleryPage.jsx
// ========================================================================
import React from 'react';
import { recipes } from '../data/recipeData';
import Header from '../components/Header';

// SVG Icon Components
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-gray-800">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);


const RecipesGalleryPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header
        title="Recipe Gallery"
        subtitle="Find cooking inspiration from our collection of selected recipes."
      />
      <main className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative">
              
              {/* Featured Dish Badge */}
              {recipe.isFeatured && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
                  <StarIcon />
                  Featured
                </div>
              )}
              
              <img src={recipe.image} alt={recipe.name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                <p className="text-gray-600 mb-4 h-20">{recipe.description}</p>
                
                {/* Cooking Time */}
                <div className="flex items-center text-gray-500 text-sm">
                    <ClockIcon />
                    <span>{recipe.cookingTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RecipesGalleryPage;