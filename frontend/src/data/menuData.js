// ========================================================================
// FILE: src/data/menuData.js
// ========================================================================
// Image imports
import cheesePizza from '../assets/graphics/pizza/pizza - cheese.jpg';
import hawaiianPizza from '../assets/graphics/pizza/pizza - hawaiian.jpg';
import margheritaPizza from '../assets/graphics/pizza/pizza - margherita.jpg';
import meatLoversPizza from '../assets/graphics/pizza/pizza - meat lovers.jpg';
import pepperoniPizza from '../assets/graphics/pizza/pizza - pepperoni.jpg';
import pestoChickenPizza from '../assets/graphics/pizza/pizza - pesto chicken.jpg';
import bolognesePasta from '../assets/graphics/pasta/pasta - spag - bolognese cropped.jpg';
import carbonaraPasta from '../assets/graphics/pasta/pasta - spag - carbonara cropped.jpg';
import lasagnaPasta from '../assets/graphics/pasta/pasta - lasagna - cropped.jpg';
import caesarSalad from '../assets/graphics/appetizers/app - salad - caesar - cropped.jpg';
import bruschetta from '../assets/graphics/appetizers/app - bruschetta cropped.jpg';
import carrotCake from '../assets/graphics/dessert/dessert - carrot cake - cropped.jpg';


export const menuData = {
  pizzas: [
    { id: 'p1', name: 'Cheese Pizza', description: 'Classic pizza with rich tomato sauce and mozzarella cheese.', price: 12.99, image: cheesePizza },
    { id: 'p2', name: 'Hawaiian Pizza', description: 'A sweet and savory combination of ham, pineapple, and mozzarella.', price: 14.99, image: hawaiianPizza },
    { id: 'p3', name: 'Margherita Pizza', description: 'Simple yet delicious with fresh basil, mozzarella, and tomato sauce.', price: 13.99, image: margheritaPizza },
    { id: 'p4', name: 'Meat Lovers Pizza', description: 'Loaded with pepperoni, sausage, bacon, and ham.', price: 16.99, image: meatLoversPizza },
    { id: 'p5', name: 'Pepperoni Pizza', description: 'A timeless classic with spicy pepperoni and mozzarella.', price: 14.50, image: pepperoniPizza },
    { id: 'p6', name: 'Pesto Chicken Pizza', description: 'Grilled chicken, pesto sauce, and sun-dried tomatoes.', price: 15.99, image: pestoChickenPizza },
  ],
  pastas: [
    { id: 'pa1', name: 'Spaghetti Bolognese', description: 'Traditional meat sauce over a bed of spaghetti.', price: 15.50, image: bolognesePasta },
    { id: 'pa2', name: 'Spaghetti Carbonara', description: 'Creamy sauce with pancetta, egg, and parmesan cheese.', price: 16.00, image: carbonaraPasta },
    { id: 'pa3', name: 'Lasagna', description: 'Layers of pasta, meat sauce, and cheese, baked to perfection.', price: 17.00, image: lasagnaPasta },
  ],
  appetizers: [
     { id: 'a1', name: 'Caesar Salad', description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.', price: 9.50, image: caesarSalad },
     { id: 'a2', name: 'Bruschetta', description: 'Toasted bread topped with fresh tomatoes, garlic, and basil.', price: 8.00, image: bruschetta },
  ],
  desserts: [
      { id: 'd1', name: 'Carrot Cake', description: 'Moist spiced cake with cream cheese frosting.', price: 7.50, image: carrotCake },
  ],
};