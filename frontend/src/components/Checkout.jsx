import React from 'react';
import { formatBaht } from '../utils/currency';
import { FaCreditCard, FaQrcode } from 'react-icons/fa';
import { resolveImageUrl } from '../utils/images';

const Checkout = ({ cartItems, subtotal, total }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
    <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-4">Checkout</h2>
    <div className="flex-grow overflow-y-auto max-h-72">
      {cartItems.length === 0 ? (
        <p className="text-slate-500 text-center mt-4">Keranjang Anda kosong.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <img src={resolveImageUrl(item.image)} alt={item.name} className="w-10 h-10 rounded-md object-cover mr-3" />
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-slate-700">{formatBaht(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    <div className="mt-auto border-t pt-4">
      <div className="space-y-2 text-sm">
          <div className="flex justify-between">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-semibold">{formatBaht(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Pengiriman</span>
          <span className="font-semibold">Gratis</span>
        </div>
      </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <span className="text-xl font-bold text-slate-800">Total</span>
        <span className="text-2xl font-bold text-amber-600">{formatBaht(total)}</span>
      </div>
      <button className="w-full mt-6 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 shadow-md">
        Pesan Sekarang
      </button>
    </div>
  </div>
);

export default Checkout;