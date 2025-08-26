import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'epic_cart_v1';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
      // notify same-tab listeners
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  const addItem = (id, qty = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
      return [...prev, { id, quantity: qty }];
    });
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const setQuantity = (id, quantity) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)));
  };

  const clearCart = () => setCartItems([]);

  const totalCount = useMemo(() => cartItems.reduce((s, i) => s + (i.quantity || 0), 0), [cartItems]);

  const value = {
    cartItems,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    totalCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export default CartContext;
