import React from 'react';
import { FaLaptopCode, FaBriefcase, FaHeart, FaPlane, FaCoffee } from 'react-icons/fa';

const categories = [
  { name: 'Technology', icon: <FaLaptopCode /> },
  { name: 'Business', icon: <FaBriefcase /> },
  { name: 'Lifestyle', icon: <FaCoffee /> },
  { name: 'Health', icon: <FaHeart /> },
  { name: 'Travel', icon: <FaPlane /> },
];

const CategorySelect = ({ category, setCategory }) => {
  return (
    <div className="mb-6">
      <label className="text-lg font-semibold block mb-3">Select Category</label>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.name}
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition 
              ${
                category === cat.name
                  ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-md'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => setCategory(cat.name)}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
