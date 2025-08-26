// src/components/checkout/ShippingAddress.jsx
import React, { useState } from 'react';

const ShippingAddress = ({ onNext, onBack }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address) {
      onNext({ address });
    } else {
      alert('Please enter a shipping address.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Address</h2>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
        <textarea name="address" id="address" rows="4" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required></textarea>
        <p className="text-xs text-gray-500 mt-1">This is a placeholder. It will be integrated with Google Maps API later.</p>
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300">Back</button>
        <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300">Next</button>
      </div>
    </form>
  );
};

export default ShippingAddress;