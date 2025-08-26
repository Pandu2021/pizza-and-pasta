import React from 'react';
import { Link } from 'react-router-dom';
import useMenuData from '../hooks/useMenuData';
import { formatBaht } from '../utils/currency';
import { useCart } from '../context/CartContext';

const ShoppingCartPage = () => {
  const { cartItems, setQuantity, removeItem } = useCart();
  const { data: menuData, loading: menuLoading } = useMenuData('');

  // Provide wrapper handlers using context
  const handleQuantityChange = (id, amount) => {
    const found = cartItems.find((c) => c.id === id);
    if (found) {
      const newQty = Math.max(1, found.quantity + amount);
      setQuantity(id, newQty);
    }
  };

  const handleRemoveItem = (id) => removeItem(id);
  // resolve cart items against menu data
  const flattenedMenu = (menuData && Object.values(menuData).flat()) || [];
  const resolvedItems = cartItems
    .map((ci) => {
      const meta = flattenedMenu.find((m) => m.id === ci.id);
      if (!meta) return null;
      return { ...meta, quantity: ci.quantity };
    })
    .filter(Boolean);

  const subtotal = resolvedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Your Shopping Cart
        </h1>

    {cartItems.length === 0 || resolvedItems.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-lg shadow-lg">
      <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <Link
              to="/order"
              className="mt-4 inline-block bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {resolvedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex flex-col sm:flex-row items-center justify-between"
                >
                  <div className="flex items-center mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-md object-cover mr-4"
                    />
                    <div>
                      <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                      <p className="text-gray-600">{formatBaht(item.price)}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button onClick={() => handleQuantityChange(item.id, -1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                    </div>

                    {/* Total Price per item */}
                    <p className="font-semibold text-gray-800 w-32 text-right mx-4">{formatBaht(item.price * item.quantity)}</p>

                    {/* Remove Button */}
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-gray-50 p-6">
              <div className="flex justify-end items-center">
                <span className="text-lg font-semibold text-gray-700 mr-4">
                  Subtotal:
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {formatBaht(subtotal)}
                </span>
              </div>
              <div className="flex justify-end mt-6">
                <Link
                  to="/checkout"
                  className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300 text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
