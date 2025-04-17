import React, { useState } from "react";
import { Lock } from "lucide-react";
import CommentSection from "./CommentSection";
import BlogBanner from "./BlogBanner";

const BlogContent = ({ blog }) => {
  const [isPaidUnlocked, setIsPaidUnlocked] = useState(!blog.isPaid);

  const handleUnlock = () => {
    setIsPaidUnlocked(true);
  };

  return (
    <div className="prose prose-lg max-w-4xl mx-auto px-4 py-10">
       <BlogBanner
        image={blog.coverImage}
        title={blog.title}
        author={blog.author?.username}
        date={blog.createdAt}
        readTime={blog.readTime}
        profileImage={blog.author?.profileImage}
      />

      {/* Author Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={blog.author?.profileImage || "/avatar.jpg"}
          alt="Author"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-base">{blog.author?.username || "Unknown Author"}</p>
          <p className="text-sm text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString()} • {blog.readTime}
          </p>
        </div>
      </div>

      {/* Blog Title */}
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

      {/* Free Content */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
        <div className="text-gray-900" dangerouslySetInnerHTML={{ __html: blog.freeContent }} />
      </section>

      {/* Paid Content */}
      {blog.isPaid && (
        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Premium Content</h2>
          <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 relative">
            {!isPaidUnlocked ? (
              <div className="text-center py-10">
                <Lock className="w-10 h-10 mx-auto text-gray-400" />
                <p className="text-base text-gray-700 mt-2">
                  This section is for premium readers only.
                </p>
                <button
                  onClick={handleUnlock}
                  className="mt-4 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                >
                  Unlock for ₹{blog.price}
                </button>
              </div>
            ) : (
              <div className="text-gray-900" dangerouslySetInnerHTML={{ __html: blog.paidContent }} />
            )}
          </div>
        </section>
      )}

      {/* Comments */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Join the Conversation</h2>
        <CommentSection />
      </section>
    </div>
  );
};

export default BlogContent;
