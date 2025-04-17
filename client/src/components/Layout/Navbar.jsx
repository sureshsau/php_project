import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FiMenu, FiX } from "react-icons/fi";
import AuthButton from "./AuthButton";
import { useSelector } from "react-redux";

const Navbar = () => {
  const auth=useSelector((state)=>state.auth.auth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50 px-15">
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <GoGraph size={30} className="text-blue-800 drop-shadow-md" />
          <h1 className="text-xl font-bold text-gray-900">Entirety Markets</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home","Services", "Dashboard", "Contact", "About","Learn","Credential"].map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.toLowerCase()}`}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold text-md"
                  : "text-gray-700 hover:text-blue-500 text-md transition-all"
              }
            >
              {item}
            </NavLink>
          ))}
          {
          auth?.isLoggedIn?<img
          className="hidden md:inline-block w-10 h-10 rounded-full border-2 border-gray-300"
          src={auth.profileImage}
          alt="User Avatar"
        />:null
        }

          <AuthButton />
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 bg-white py-4 shadow-lg">
          {["Home","Services", "Dashboard", "Contact", "About","Learn","Credential"].map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold text-md"
                  : "text-gray-700 hover:text-blue-500 text-md transition-all"
              }
            >
              {item}
            </NavLink>
          ))}
          <AuthButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
