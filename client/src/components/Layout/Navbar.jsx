import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FiMenu, FiX } from "react-icons/fi";
import {
  AiOutlineHome,
  AiOutlineDashboard,
  AiOutlinePhone,
  AiOutlineInfoCircle,
  AiOutlineRead,
  AiOutlineSolution,
} from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import AuthButton from "./AuthButton";
import { useSelector } from "react-redux";

const navItems = [
  { label: "Home", icon: <AiOutlineHome />, path: "home" },
  { label: "Services", icon: <AiOutlineSolution />, path: "services" },
  { label: "Dashboard", icon: <AiOutlineDashboard />, path: "dashboard" },
  { label: "Contact", icon: <AiOutlinePhone />, path: "contact" },
  { label: "About", icon: <AiOutlineInfoCircle />, path: "about" },
  { label: "Credential", icon: <FaRegAddressCard />, path: "credential" },
];

const Navbar = () => {
  const auth = useSelector((state) => state.auth.auth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50 px-15">
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
         
          <h1 className="text-xl font-bold text-gray-900">BlogNest</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.path}`}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-blue-600 font-semibold text-md"
                  : "flex items-center gap-2 text-gray-700 hover:text-blue-500 text-md transition-all"
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}

          {auth?.isLoggedIn && (
            <img
              className="hidden md:inline-block w-10 h-10 rounded-full border-2 border-gray-300"
              src={auth.profileImage}
              alt="User Avatar"
            />
          )}

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
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.path}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-blue-600 font-semibold text-md"
                  : "flex items-center gap-2 text-gray-700 hover:text-blue-500 text-md transition-all"
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
          <AuthButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
