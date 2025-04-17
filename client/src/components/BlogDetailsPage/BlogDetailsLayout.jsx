import React, { useEffect, useState } from "react";
import BlogContent from "./BlogContent";
import BlogSidebar from "./BlogSidebar";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import BlogBanner from "./BlogBanner";
import Banner from '../HomePage/Banner';

const BlogDetailsLayout = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) getBlogDetails();
  }, [id]);

  const getBlogDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/blog/${id}`);
      if (data?.success) {
        setBlog(data.blog);
      }
    } catch (error) {
      toast.error("Error fetching blog details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Loading blog details...
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Banner Section */}
      <Banner />

      {/* Main Blog Content Section */}
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
            <BlogContent blog={blog} />
          </div>

          {/* Sidebar */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <BlogSidebar blog={blog} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsLayout;
