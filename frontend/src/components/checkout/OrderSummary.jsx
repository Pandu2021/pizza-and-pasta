// src/components/checkout/OrderSummary.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { formatBaht } from '../../utils/currency';
import { useCart } from '../../context/CartContext';

const OrderSummary = ({ data, onBack, onConfirmed }) => {
  const { cartItems, clearCart } = useCart();
  const [quote, setQuote] = useState(null);
  const [quoteError, setQuoteError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const canConfirm = useMemo(() => {
    if (!quote) return false;
    // compare cart subtotal with quote.subtotal
    return typeof quote.total === 'number' && quote.total >= 0;
  }, [quote]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setQuoteError(null);
        const token = localStorage.getItem('auth_token');
        // cartItems has only ids and quantities; send to server
        const items = cartItems.map((i) => ({ id: i.id, quantity: i.quantity }));
        const res = await fetch('/api/checkout/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          body: JSON.stringify({ items }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setQuote(json);
      } catch (e) {
        setQuoteError(e);
      }
    };
    fetchQuote();
  }, [cartItems]);

  const handleConfirm = async () => {
    if (!quote || submitting) return;
    try {
      setSubmitting(true);
      const token = localStorage.getItem('auth_token');
      const items = cartItems.map((i) => ({ id: i.id, quantity: i.quantity }));
      const shipping = {
        name: data?.personal?.name || '',
        address1: data?.shipping?.address || '',
        city: '', state: '', postalCode: ''
      };
      const payment = { method: data?.payment?.method === 'creditcard' ? 'card' : (data?.payment?.method || 'cod') };
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ items, shipping, payment }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // Clear cart and notify parent
      clearCart();
      onConfirmed?.(json.order);
    } catch (e) {
      setQuoteError(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold text-lg mb-2">Customer Details</h3>
          <p><strong>Name:</strong> {data.personal.name}</p>
          <p><strong>Phone:</strong> {data.personal.phone}</p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
          <p>{data.shipping.address}</p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold text-lg mb-2">Payment Method</h3>
          <p className="capitalize">{data.payment.method?.replace('creditcard', 'Credit Card') || 'N/A'}</p>
        </div>
        <div className="p-4 border rounded-lg">
           <h3 className="font-semibold text-lg mb-2">Cost Details</h3>
           {quoteError && <p className="text-red-600 text-sm mb-2">Failed to get cost quote. Please try again.</p>}
           <div className="flex justify-between">
               <p>Subtotal</p>
               <p>{formatBaht(quote?.subtotal || 0)}</p>
           </div>
            <div className="flex justify-between">
               <p>Delivery Fee</p>
               <p>{formatBaht(quote?.deliveryFee || 0)}</p>
           </div>
           <div className="flex justify-between">
               <p>Tax</p>
               <p>{formatBaht(quote?.tax || 0)}</p>
           </div>
           <hr className="my-2"/>
           <div className="flex justify-between font-bold text-xl">
               <p>Total</p>
               <p>{formatBaht(quote?.total || 0)}</p>
           </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button type="button" onClick={onBack} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300">Back</button>
        <button disabled={!canConfirm || submitting} onClick={handleConfirm} className={`font-bold py-2 px-6 rounded-lg transition duration-300 ${!canConfirm || submitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}>{submitting ? 'Processing...' : 'Confirm & Order'}</button>
      </div>
    </div>
  );
};

export default OrderSummary;