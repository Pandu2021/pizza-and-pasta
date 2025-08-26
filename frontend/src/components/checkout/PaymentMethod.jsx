// src/components/checkout/PaymentMethod.jsx
import React, { useState } from 'react';

const PaymentMethod = ({ onNext, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      onNext({ method: paymentMethod });
    } else {
      alert('Please select a payment method.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Method</h2>
      <div className="space-y-4">
        <div className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-orange-50" onClick={() => setPaymentMethod('promptpay')}>
          <input type="radio" name="paymentMethod" value="promptpay" checked={paymentMethod === 'promptpay'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500" />
          <label className="ml-3 block text-sm font-medium text-gray-700">PromptPay QR</label>
        </div>
         <div className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-orange-50" onClick={() => setPaymentMethod('creditcard')}>
          <input type="radio" name="paymentMethod" value="creditcard" checked={paymentMethod === 'creditcard'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500" />
          <label className="ml-3 block text-sm font-medium text-gray-700">Credit Card (via Omise)</label>
        </div>
         <div className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-orange-50" onClick={() => setPaymentMethod('cod')}>
          <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500" />
          <label className="ml-3 block text-sm font-medium text-gray-700">Cash on Delivery (COD)</label>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button type="button" onClick={onBack} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300">Back</button>
        <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300">Next</button>
      </div>
    </form>
  );
};

export default PaymentMethod;