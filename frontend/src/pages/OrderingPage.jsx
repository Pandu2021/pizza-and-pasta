// ========================================================================
// FILE: src/pages/OrderingPage.jsx
// ========================================================================
import React from 'react';
import useMenuData from '../hooks/useMenuData';
import Header from '../components/Header';
import Button from '../components/Button';
import { formatBaht } from '../utils/currency';
import { addToCart } from '../utils/cart';
import { useCart } from '../context/CartContext';
import { resolveImageUrl } from '../utils/images';

const MenuCard = ({ item, onAdd }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
    <img src={resolveImageUrl(item.image)} alt={item.name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
      <p className="text-gray-600 mt-2">{item.description}</p>
      <div className="flex justify-between items-center mt-4">
      <span className="text-lg font-bold text-red-700">{formatBaht(item.price)}</span>
      <Button className="add-to-cart px-4 py-2 text-sm" onClick={() => onAdd(item.id)}>Add to Cart</Button>
          </div>
    </div>
  </div>
);

const MenuSection = ({ title, items }) => (
  <section id={title.toLowerCase()} className="py-12">
    <h2 className="text-4xl font-bold text-center mb-10">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map(item => <MenuCard key={item.id} item={item} />)}
    </div>
  </section>
);

const OrderingPage = () => {
  const { data, loading, error } = useMenuData('');
  const source = data;

  const { addItem } = useCart();
  const handleAdd = (id) => {
    addItem(id, 1);
    // Optionally: show toast or redirect to cart
  };

  return (
    <div className="bg-gray-50">
      <Header title="Our Menu" subtitle="Authentic Italian dishes made with love and the finest ingredients." />
      <main className="container mx-auto py-8 px-4">
        {loading && <p className="text-center">Loading menu...</p>}
        {error && <p className="text-center text-red-500">Failed to load menu.</p>}
        {source && (
          <>
            <section id="pizzas" className="py-12">
              <h2 className="text-4xl font-bold text-center mb-10">Pizzas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {source.pizzas.map(item => <MenuCard key={item.id} item={item} onAdd={handleAdd} />)}
              </div>
            </section>

            <section id="pastas" className="py-12">
              <h2 className="text-4xl font-bold text-center mb-10">Pastas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {source.pastas.map(item => <MenuCard key={item.id} item={item} onAdd={handleAdd} />)}
              </div>
            </section>

            <section id="appetizers" className="py-12">
              <h2 className="text-4xl font-bold text-center mb-10">Appetizers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {source.appetizers.map(item => <MenuCard key={item.id} item={item} onAdd={handleAdd} />)}
              </div>
            </section>

            <section id="soups" className="py-12">
              <h2 className="text-4xl font-bold text-center mb-10">Soups</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {source.soups.map(item => <MenuCard key={item.id} item={item} onAdd={handleAdd} />)}
              </div>
            </section>

            <section id="salads" className="py-12">
              <h2 className="text-4xl font-bold text-center mb-10">Salads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {source.salads.map(item => <MenuCard key={item.id} item={item} onAdd={handleAdd} />)}
              </div>
            </section>

            <section id="desserts" className="py-12">
              <h2 className="text-4xl font-bold text-center mb-10">Desserts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {source.desserts.map(item => <MenuCard key={item.id} item={item} onAdd={handleAdd} />)}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default OrderingPage;