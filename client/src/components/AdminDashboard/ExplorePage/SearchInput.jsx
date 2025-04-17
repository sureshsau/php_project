import React from 'react';
import { FaSearch, FaLaptopCode, FaBuilding, FaHeart, FaPlane, FaDollarSign, FaGlobe } from 'react-icons/fa';

const categories = [
  { name: 'All Topics', icon: <FaGlobe /> },
  { name: 'Technology', icon: <FaLaptopCode /> },
  { name: 'Business', icon: <FaBuilding /> },
  { name: 'Lifestyle', icon: <FaHeart /> },
  { name: 'Health', icon: <FaHeart /> },
  { name: 'Travel', icon: <FaPlane /> },
  { name: 'Finance', icon: <FaDollarSign /> },
];

const SearchInput = ({ value, setValue, category, setCategory }) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Search Input */}
      <div className="relative">
        <FaSearch className="absolute top-3 left-3 text-gray-500" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for topics, writers, or keywords..."
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            type="button"
            onClick={() => setCategory(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition border
              ${
                category === cat.name
                  ? 'bg-blue-100 text-blue-600 border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchInput;
