import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { order } = location.state || {}; // Get order data passed from checkout
  const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
  const deliveryTime = "20-30 minutes";

  if (!order) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-8">We couldn't find your order details.</p>
            <Link to="/" className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300">
                Back to Home
            </Link>
        </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Order Received!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you, {order.personal.name}. Your order is being processed.
        </p>

        <div className="text-left mt-8 border-t border-b py-6 space-y-4">
            <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Order Number:</span>
                <span className="font-mono text-gray-900">{orderId}</span>
            </div>
             <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Estimated Delivery:</span>
                <span className="text-gray-900">{deliveryTime}</span>
            </div>
             <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Shipping Address:</span>
                <span className="text-gray-900 text-right max-w-xs">{order.shipping.address}</span>
            </div>
        </div>

        <div className="mt-8">
            <Link
                to="/"
                className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300"
            >
                Back to Home
            </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
