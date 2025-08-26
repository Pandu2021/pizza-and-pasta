import React from 'react';
import useMenuData from '../hooks/useMenuData';
import { menuData as localMenu } from '../data/menuData'; 
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { resolveImageUrl } from '../utils/images';
import { formatBaht } from '../utils/currency';

const CollapsibleMenu = ({ title, items, isOpen, onClick, onItemSelect }) => (
  <div className="border-b border-slate-200 last:border-b-0">
    <button onClick={onClick} className="w-full flex justify-between items-center py-3 px-2 text-left font-semibold text-lg text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
      <span>{title}</span>
      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
    </button>
    {isOpen && (
      <div className="pl-4 pr-2 py-2 max-h-60 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} onClick={() => onItemSelect(item)} className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors">
            <img src={resolveImageUrl(item.image)} alt={item.name} className="w-12 h-12 rounded-md object-cover mr-4" />
            <div>
              <p className="font-semibold text-slate-800">{item.name}</p>
              <p className="text-sm text-amber-600 font-bold">{formatBaht(item.price)}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const MenuSection = ({ activeCategory, setActiveCategory, onItemSelect }) => {
  const { data, loading, error } = useMenuData('');
  const source = data || localMenu;
  const categories = Object.keys(source);
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Menu</h2>
      {loading && <p className="text-sm text-gray-500 mb-4">Loading menu...</p>}
      {error && <p className="text-sm text-red-500 mb-4">Failed to load menu; showing local menu.</p>}
      <div className="space-y-2">
        {categories.map((category) => (
          <CollapsibleMenu
            key={category}
            title={category.charAt(0).toUpperCase() + category.slice(1)}
            items={source[category]}
            isOpen={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            onItemSelect={onItemSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
