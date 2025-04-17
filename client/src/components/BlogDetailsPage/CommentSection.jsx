import React, { useState } from "react";
import { FaReply, FaThumbsUp } from "react-icons/fa";

const comments = [
    {
      name: "Jennifer Park",
      time: "2 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text:
        "This is such an insightful article! I've been experimenting with AI writing tools for my marketing team...",
      likes: 24,
      replies: [
        {
          name: "Michael Chen",
          role: "author",
          time: "1 hour ago",
          avatar: "https://randomuser.me/api/portraits/men/33.jpg",
          text:
            "Thanks for sharing your experience, Jennifer! You're right about the rapid progress.",
        },
      ],
    },
    {
      name: "Robert Thompson",
      time: "5 hours ago",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      text:
        "I appreciate the section on ethical considerations. As an educator, I'm concerned about how we'll teach students...",
      likes: 19,
    },
  ];
const CommentSection = () => {
  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (newComment.trim()) {
      alert("Posted comment: " + newComment);
      setNewComment("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>

      {/* Add Comment Box */}
      <div className="flex items-start gap-3 mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:border-blue-400 resize-none"
            rows="3"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handlePostComment}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      {comments.map((comment, idx) => (
        <div key={idx} className="mb-6">
          <div className="flex items-start gap-3">
            <img
              src={comment.avatar}
              alt={comment.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{comment.name}</h4>
                {comment.role === "author" && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    Author
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-2">{comment.time}</p>
              <p className="text-gray-800">{comment.text}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1 cursor-pointer">
                  <FaThumbsUp className="text-blue-500" />
                  {comment.likes}
                </span>
                <span className="flex items-center gap-1 cursor-pointer">
                  <FaReply />
                  Reply
                </span>
              </div>
            </div>
          </div>

          {/* Reply (if any) */}
          {comment.replies?.map((reply, ridx) => (
            <div key={ridx} className="ml-12 mt-4">
              <div className="flex items-start gap-3">
                <img
                  src={reply.avatar}
                  alt={reply.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{reply.name}</h4>
                    {reply.role === "author" && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        Author
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{reply.time}</p>
                  <p className="text-gray-800 text-sm">{reply.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
