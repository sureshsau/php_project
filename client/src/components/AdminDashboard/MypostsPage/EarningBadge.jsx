import React from "react";
import { FaDollarSign } from "react-icons/fa";

const EarningsBadge = ({ amount }) => {
  return (
    <div className="inline-flex items-center bg-green-100 text-green-700 px-2 py-1 text-sm rounded-full">
      <FaDollarSign className="mr-1" /> {amount}
    </div>
  );
};

export default EarningsBadge;
