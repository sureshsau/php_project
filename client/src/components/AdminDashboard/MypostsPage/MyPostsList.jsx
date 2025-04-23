import React, { useEffect, useState } from "react";
import MyPostCard from "./MyPostCard";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axiosInstance"
import { toast } from "react-toastify";

const MyPostsList = () => {
  const auth = useSelector((state) => state.auth.auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      const { data } = await axiosInstance.get('/blog', {author:auth.id });
      console.log(data);
      setPosts(data.blogs || []);
    } catch (error) {
      toast.error("Failed to load your posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.id) {
      fetchMyPosts();
    }
  }, [auth?.id]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Posts</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading your posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500">You haven't posted anything yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post) => (
            <MyPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsList;