import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const BlogSidebar = ({ blog }) => {
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);

  useEffect(() => {
    const fetchAuthorBlogs = async () => {
      try {
        const { data } = await axiosInstance.get("/blog", {
          params: { author: blog.author._id },
        });

        if (data.success && Array.isArray(data.blogs)) {
          const filtered = data.blogs.filter(
            (item) => item.author._id === blog.author._id && item._id !== blog._id
          );
          setAuthorBlogs(filtered.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching author blogs:", error);
      }
    };

    const fetchRecommendedBlogs = async () => {
      try {
        const { data } = await axiosInstance.get(`/blog/recommended/${blog._id}`);
        if (data.success) {
          setRecommendedBlogs(data.blogs);
        }
      } catch (error) {
        console.error("Error fetching recommended blogs:", error);
      }
    };

    if (blog?.author?._id && blog?._id) {
      fetchAuthorBlogs();
      fetchRecommendedBlogs();
    }
  }, [blog]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Article Stats</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>👁️ Views: <strong>{blog.views}</strong></li>
          <li>❤️ Likes: <strong>328</strong></li>
          <li>💬 Comments: <strong>42</strong></li>
          <li>🔖 Bookmarks: <strong>156</strong></li>
          <li>📤 Shares: <strong>89</strong></li>
        </ul>
      </div>

      {/* More from author */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-3">More from {blog.author.username}</h3>
        <ul className="space-y-3">
          {authorBlogs.map((item) => (
            <li key={item._id}>
              <div className="flex gap-3">
                <img
                  src={item.coverImage || "/placeholder.jpg"}
                  alt={item.title}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button className="w-full text-sm mt-3 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100">
          View All Articles
        </button>
      </div>

      {/* Recommended blogs */}
      {recommendedBlogs.length > 0 && (
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Recommended for You</h3>
          <ul className="space-y-3">
            {recommendedBlogs.map((item) => (
              <li key={item._id}>
                <div className="flex gap-3">
                  <img
                    src={item.coverImage || "/placeholder.jpg"}
                    alt={item.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogSidebar;
