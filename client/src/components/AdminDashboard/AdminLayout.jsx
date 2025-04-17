import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCompass,
  FaPlusCircle,
  FaFileAlt,
  FaDollarSign,
  FaChartBar,
  FaCog,
  FaBookOpen,
} from 'react-icons/fa';
import Layout from '../Layout/Layout';
import { useSelector } from 'react-redux';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
  { name: 'Explore', path: '/dashboard/explore', icon: <FaCompass /> },
  { name: 'New Post', path: '/dashboard/new-post', icon: <FaPlusCircle /> },
  { name: 'My Posts', path: '/dashboard/my-posts', icon: <FaFileAlt /> },
  { name: 'Earnings', path: '/dashboard/earnings', icon: <FaDollarSign /> },
  { name: 'Analytics', path: '/dashboard/analytics', icon: <FaChartBar /> },
  { name: 'Settings', path: '/dashboard/settings', icon: <FaCog /> },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth=useSelector(state=>state.auth.auth)
  console.log(auth);
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-80px)] bg-gray-50 mt-15">
        {/* Left Sidebar */}
        <aside className="w-72 bg-white shadow-md p-6 flex flex-col justify-between border-r border-gray-200">
          <div>
            {/* Profile */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src={auth.profileImage}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="font-semibold">{auth.username}</h2>
                <p className="text-sm text-gray-500">Writer & Editor</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.path)}
                    className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded font-medium ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* Writing Tips */}
            <div className="mt-10 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Writing Tips</h3>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>Use a compelling headline</li>
                <li>Break up long paragraphs</li>
                <li>Include relevant images</li>
                <li>Use subheadings</li>
                <li>End with a CTA</li>
              </ul>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-blue-100 text-blue-900 rounded-md p-4 mt-6 text-sm flex items-start gap-3">
            <FaBookOpen className="mt-1 text-lg" />
            <div>
              <p className="font-semibold mb-1">Need Help?</p>
              <p>Access our writing guides and resources</p>
              <button className="mt-2 underline">View Resources</button>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </Layout>
  );
};

export default AdminLayout;
