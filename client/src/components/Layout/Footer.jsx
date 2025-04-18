import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Blog Name & Tagline */}
        <div>
          <h1 className="text-white text-2xl font-bold">BlogNest</h1>
          <p className="mt-3 text-gray-400 text-sm">
            Nest your thoughts. Share your stories. Explore ideas that matter. BlogNest connects minds globally.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Learn</a></li>
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Write a Blog</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Get in Touch</h3>
          <p className="text-gray-400 text-sm">Email: hello@blognest.com</p>
          <p className="text-gray-400 text-sm">Support: support@blognest.com</p>
          <p className="text-gray-400 text-sm">Location: India</p>
        </div>

        {/* Social Media Icons */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Stay Connected</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaLinkedinIn /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BlogNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
