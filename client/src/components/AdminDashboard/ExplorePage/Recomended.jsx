import React from "react";
import { FaRegClock, FaHeart } from "react-icons/fa";

const articles = [
  {
    title: "10 Productivity Hacks for Remote Workers",
    author: "Alex Turner",
    date: "Apr 7, 2025",
    time: "5 min read",
    img: "https://source.unsplash.com/featured/?remote,work",
    views: "1.2k",
    likes: 86
  },
  {
    title: "The Ultimate Guide to Nutrition for Busy Professionals",
    author: "Sophia Lee",
    date: "Apr 5, 2025",
    time: "7 min read",
    img: "https://source.unsplash.com/featured/?healthy,food",
    views: "1.8k",
    likes: 124
  },
  {
    title: "Cryptocurrency 101: A Beginner's Guide to Digital Assets",
    author: "James Morgan",
    date: "Apr 3, 2025",
    time: "8 min read",
    img: "https://source.unsplash.com/featured/?cryptocurrency",
    views: "2.3k",
    likes: 178
  },
  {
    title: "5 Off-the-Beaten-Path Travel Destinations for 2025",
    author: "Nina Patel",
    date: "Apr 1, 2025",
    time: "6 min read",
    img: "https://source.unsplash.com/featured/?travel,nature",
    views: "1.5k",
    likes: 92
  }
];

const Recommended = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recommended For You</h2>
        <a href="#" className="text-blue-500 hover:underline">View All</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((item, index) => (
          <div key={index} className="flex border rounded-lg overflow-hidden shadow-sm hover:shadow-md bg-white">
            <img src={item.img} alt={item.title} className="w-1/3 object-cover" />
            <div className="p-4 w-2/3">
              <div className="text-xs text-gray-500 mb-1">{item.date} • {item.time}</div>
              <h3 className="text-md font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.author}</p>
              <div className="flex gap-4 text-xs text-gray-500">
                <p><FaRegClock className="inline mr-1" /> {item.views}</p>
                <p><FaHeart className="inline mr-1" /> {item.likes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
