// ========================================================================
// FILE: src/data/recipeData.js
// ========================================================================
import margheritaPizza from '../assets/graphics/pizza/pizza - margherita.jpg';
import pepperoniPizza from '../assets/graphics/pizza/pizza - pepperoni.jpg';
import carbonaraPasta from '../assets/graphics/pasta/pasta - spag - carbonara cropped.jpg';
import bolognesePasta from '../assets/graphics/pasta/pasta - spag - bolognese cropped.jpg';
import caesarSalad from '../assets/graphics/appetizers/app - salad - caesar - cropped.jpg';

export const recipes = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'A classic Italian pizza with tomato sauce, mozzarella, and fresh basil.',
    image: margheritaPizza,
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Fresh basil', 'Olive oil'],
    instructions: [
      'Preheat oven to 220°C (430°F).',
      'Roll out the pizza dough and spread a thin layer of tomato sauce.',
      'Top with slices of mozzarella and fresh basil leaves.',
      'Bake for 10-12 minutes until the crust is golden and cheese is bubbly.',
    ],
    isFeatured: true,
    cookingTime: '25 minutes',
  },
  {
    id: 2,
    name: 'Spaghetti Carbonara',
    description: 'A creamy and delicious pasta dish made with eggs, cheese, and pancetta.',
    image: carbonaraPasta,
    ingredients: ['Spaghetti', 'Eggs', 'Pecorino Romano cheese', 'Pancetta', 'Black pepper'],
    instructions: [
      'Cook spaghetti according to package directions.',
      'While pasta cooks, fry pancetta until crisp.',
      'In a bowl, whisk eggs and grated cheese.',
      'Drain pasta, reserving some pasta water. Combine pasta with pancetta. Slowly stir in egg mixture, adding pasta water to create a creamy sauce.',
    ],
    isFeatured: true,
    cookingTime: '20 minutes',
  },
  {
    id: 3,
    name: 'Classic Pepperoni Pizza',
    description: 'The all-time favorite pizza topped with spicy pepperoni slices.',
    image: pepperoniPizza,
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Pepperoni slices'],
    instructions: [
      'Preheat oven to 220°C (430°F).',
      'Spread tomato sauce on the pizza dough.',
      'Cover with mozzarella cheese and arrange pepperoni slices on top.',
      'Bake for 12-15 minutes.',
    ],
    isFeatured: false,
    cookingTime: '30 minutes',
  },
    {
    id: 4,
    name: 'Spaghetti Bolognese',
    description: 'A hearty and flavorful meat-based sauce served with spaghetti.',
    image: bolognesePasta,
    ingredients: ['Spaghetti', 'Ground beef', 'Onion', 'Carrots', 'Celery', 'Canned tomatoes', 'Red wine'],
    instructions: [
      'Sauté chopped onion, carrots, and celery. Add ground beef and cook until browned.',
      'Stir in canned tomatoes and red wine. Simmer for at least 1 hour.',
      'Cook spaghetti according to package directions.',
      'Serve the sauce over the cooked spaghetti.',
    ],
    isFeatured: false,
    cookingTime: '1 hour 30 minutes',
  },
  {
    id: 5,
    name: 'Caesar Salad',
    description: 'A crisp and refreshing salad with a classic Caesar dressing.',
    image: caesarSalad,
    ingredients: ['Romaine lettuce', 'Croutons', 'Parmesan cheese', 'Caesar dressing (eggs, anchovies, garlic, olive oil)'],
    instructions: [
      'Wash and chop the romaine lettuce.',
      'In a large bowl, toss the lettuce with Caesar dressing.',
      'Top with croutons and shaved Parmesan cheese.',
      'Serve immediately.',
    ],
    isFeatured: false,
    cookingTime: '15 minutes',
  },
];