import React from "react";
import { FaRegUser, FaRegFileAlt, FaUserPlus } from "react-icons/fa";

const writers = [
  {
    name: "David Wilson",
    field: "Technology & Innovation",
    description: "Award-winning tech journalist covering emerging technologies...",
    posts: 48,
    followers: "12.4k",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sophia Lee",
    field: "Health & Wellness",
    description: "Certified nutritionist and wellness coach sharing health advice...",
    posts: 62,
    followers: "18.7k",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "James Morgan",
    field: "Finance & Investing",
    description: "Financial analyst with 15+ years of experience helping readers...",
    posts: 37,
    followers: "9.2k",
    img: "https://randomuser.me/api/portraits/men/65.jpg"
  }
];

const PopularWriters = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Popular Writers</h2>
        <a href="#" className="text-blue-500 hover:underline">View All</a>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {writers.map((writer, index) => (
          <div key={index} className="border rounded-xl p-4 w-80 shadow-sm hover:shadow-md bg-white">
            <div className="flex items-center gap-3 mb-2">
              <img src={writer.img} alt={writer.name} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-semibold">{writer.name}</p>
                <p className="text-sm text-gray-500">{writer.field}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{writer.description}</p>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <p><FaRegFileAlt className="inline mr-1" /> {writer.posts} posts</p>
              <p><FaRegUser className="inline mr-1" /> {writer.followers} followers</p>
            </div>
            <button className="mt-4 w-full py-1 border text-blue-600 border-blue-500 rounded hover:bg-blue-50 flex justify-center items-center gap-2">
              <FaUserPlus /> Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularWriters;
