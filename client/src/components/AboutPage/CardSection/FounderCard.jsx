import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const FounderCard = ({ name, role, phone, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80 text-center">
      <img src={image} alt={name} className="w-full h-60 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">{role}</p>
        <p className="text-black mt-2 flex items-center justify-center gap-2">
          <FaPhoneAlt size={16} color="black" /> {phone}
        </p>
      </div>
    </div>
  );
};

export default FounderCard;
