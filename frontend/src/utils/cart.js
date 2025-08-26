const STORAGE_KEY = 'epic_cart_v1';

export function getCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function setCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    // ignore
  }
}

export function addToCart(id, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex((i) => i.id === id);
  if (idx >= 0) {
    cart[idx].quantity += qty;
  } else {
    cart.push({ id, quantity: qty });
  }
  setCart(cart);
  // Force same-tab listeners to update (some components listen to `storage` event)
  try {
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    // ignore
  }
}

export function removeFromCart(id) {
  const cart = getCart().filter((i) => i.id !== id);
  setCart(cart);
}

export default { getCart, setCart, addToCart, removeFromCart };
