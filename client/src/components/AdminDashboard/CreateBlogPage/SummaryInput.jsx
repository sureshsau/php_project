import React from 'react';

const SummaryInput = ({ summary, setSummary }) => {
  return (
    <div className="mb-6">
      <label className="text-lg font-semibold block mb-3">Post Summary</label>
      <textarea
        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm text-gray-700"
        placeholder="Write a short summary about your blog post..."
        rows={5}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <p className="text-xs text-gray-500 mt-2">Max recommended: 300 characters</p>
    </div>
  );
};

export default SummaryInput;
