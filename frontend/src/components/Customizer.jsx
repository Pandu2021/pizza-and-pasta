import React from 'react';
import { formatBaht } from '../utils/currency';
import { resolveImageUrl } from '../utils/images';

const Customizer = ({ selectedItem, onAddToCart }) => {
  if (!selectedItem) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg flex items-center justify-center h-full">
        <p className="text-slate-500 text-center">
          Pilih item dari menu untuk melihat detailnya di sini.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <h2 className="text-3xl font-bold mb-4 text-center text-slate-800">{selectedItem.name}</h2>
      <div className="relative w-full h-80 mb-6">
        <img
          src={resolveImageUrl(selectedItem.image)}
          alt={selectedItem.name}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
      <p className="text-slate-600 mb-6 text-center">{selectedItem.description}</p>
      <div className="flex justify-between items-center mb-6">
        <span className="text-3xl font-bold text-amber-600">{formatBaht(selectedItem.price)}</span>
      </div>
      <button
        onClick={() => onAddToCart(selectedItem)}
        className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition-transform transform hover:scale-105 shadow-md"
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
};

export default Customizer;