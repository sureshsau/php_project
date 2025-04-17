import React from "react";
import { AiOutlineClose } from "react-icons/ai"; // Importing Close Icon from react-icons

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="w-screen h-screen fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50"
    onClick={onClose}
    >
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all scale-95" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <AiOutlineClose size={24} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default CustomModal;
