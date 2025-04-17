import React, { useState } from "react";
import {
  FaRegEdit,
  FaTrashAlt,
  FaEye,
  FaCommentAlt,
  FaHeart
} from "react-icons/fa";
import EarningsBadge from "./EarningBadge";
import axiosInstance from "../../../utils/axiosInstance"
import { useNavigate } from "react-router-dom";

const MyPostCard = ({ post = {}, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate=useNavigate();
  const {
    _id,
    title = "Untitled Post",
    createdAt,
    reads = "0",
    earnings = "$0.00",
    views = 0,
    comments = 0,
    likes = 0,
    coverImage = "https://via.placeholder.com/400x200?text=No+Image"
  } = post;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    : "Unknown Date";

  const handleEdit = () => {
    alert(`Editing post: ${title}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      const {data}=await axiosInstance.delete(`/blog/${_id}`);
      console.log(data);
      if (onDelete) onDelete(_id);
    } catch (err) {
      alert("Error deleting post: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-lg bg-white transition" onClick={() => navigate(`/blog/${_id}`)}>

      <img
        src={coverImage}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {formattedDate} • {reads} reads
        </p>

        <div className="flex items-center justify-between mb-2">
          <EarningsBadge amount={earnings} />
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <span className="flex items-center gap-1">
              <FaEye className="text-blue-500" /> {views}
            </span>
            <span className="flex items-center gap-1">
              <FaCommentAlt className="text-green-500" /> {comments}
            </span>
            <span className="flex items-center gap-1">
              <FaHeart className="text-pink-500" /> {likes}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleEdit}
            className="text-blue-600 border border-blue-500 px-3 py-1 rounded hover:bg-blue-50 flex items-center gap-1"
          >
            <FaRegEdit /> Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`text-red-600 border border-red-500 px-3 py-1 rounded flex items-center gap-1 ${
              isDeleting ? "bg-red-100 opacity-70 cursor-not-allowed" : "hover:bg-red-50"
            }`}
          >
            <FaTrashAlt /> {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPostCard;
