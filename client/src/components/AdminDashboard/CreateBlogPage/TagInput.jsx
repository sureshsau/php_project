import React, { useState } from 'react';

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      const newTag = input.trim().replace(',', '');
      if (!tags.includes(newTag)) setTags([...tags, newTag]);
      setInput('');
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="mb-6">
      <label className="block font-medium mb-2">Tags</label>
      <div className="border rounded px-4 py-2 bg-white flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1">
            {tag}
            <button onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700 text-xs">
              ✕
            </button>
          </span>
        ))}
        <input
          className="flex-grow outline-none py-1 text-sm"
          placeholder="Add tags (press Enter or comma to add)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <p className="text-sm text-gray-400 mt-1">
        Popular tags: technology, business, marketing, health, travel
      </p>
    </div>
  );
};

export default TagInput;
