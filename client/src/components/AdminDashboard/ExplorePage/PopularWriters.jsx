import React, { useEffect, useState } from "react";
import { FaRegUser, FaRegFileAlt, FaUserPlus } from "react-icons/fa";
import axiosInstance from "../../../utils/axiosInstance";

const PopularWriters = () => {
  const [writers, setWriters] = useState([]); // Store writers data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track error state

  useEffect(() => {
    getWriters();
  }, []);

  const getWriters = async () => {
    try {
      const { data } = await axiosInstance.get('/blog/writer');
      console.log('the writer data',data);
      if (data?.success) {
        setWriters(data.writers);
      } else {
        
        setError("Failed to fetch writers");
      }
    } catch (err) {
      console.log(err)
      setError("Error fetching writers");
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return <div>Loading writers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mb-10 bg-gradient-to-r from-blue-500 to-green-500 p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Popular Writers</h2>
        <a href="#" className="text-blue-200 hover:underline">View All</a>
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
