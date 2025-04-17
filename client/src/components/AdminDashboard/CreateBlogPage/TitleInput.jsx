import React from 'react';

const TitleInput = ({ title, setTitle }) => {
  return (
    <div className="mb-6">
      <label className="text-xl font-semibold mb-2 block">
        Enter your post title...
      </label>
      <input
        type="text"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start typing your title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default TitleInput;
