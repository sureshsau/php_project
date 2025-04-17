import React, { useEffect, useState } from 'react';
import { FaEye, FaDollarSign, FaFileAlt, FaHeart, FaArrowUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminDashboard/AdminLayout';
import ViewsLineChart from '../../components/AdminDashboard/AnalyticsPage/ViewsLineChart';
import EarningsBarChart from '../../components/AdminDashboard/AnalyticsPage/EarningsBarChart';
import axiosInstance from '../../utils/axiosInstance';

const AnalyticsPage = () => {
  const auth = useSelector((state) => state.auth.auth);

  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setLoadingPosts(true);
        const { data } = await axiosInstance.get('/blog', { params: { author: auth.id } });
        if (data.success) setRecentPosts(data.blogs);
        else setRecentPosts([]);
      } catch {
        toast.error('Failed to load recent posts');
      } finally {
        setLoadingPosts(false);
      }
    };
    if (auth?.id) fetchRecent();
  }, [auth.id]);

  const overview = [
    { label: 'Total Views', value: '24,512', delta: '12% from last month', cardBg: 'bg-blue-50', iconBg: 'bg-blue-500', Icon: FaEye },
    { label: 'Total Earnings', value: '$1,245', delta: '8% from last month', cardBg: 'bg-green-50', iconBg: 'bg-green-500', Icon: FaDollarSign },
    { label: 'Published Posts', value: '42', delta: '3 new this month', cardBg: 'bg-purple-50', iconBg: 'bg-purple-500', Icon: FaFileAlt },
    { label: 'Total Likes', value: '1,852', delta: '18% from last month', cardBg: 'bg-amber-50', iconBg: 'bg-amber-500', Icon: FaHeart }
  ];

  return (
    <AdminLayout>
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {overview.map(({ label, value, delta, cardBg, iconBg, Icon }) => (
          <div key={label} className={`${cardBg} rounded-lg p-4`}>  
            <div className="flex items-center mb-3">
              <div className={`${iconBg} p-3 rounded-full text-white mr-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm text-gray-700 font-medium">{label}</p>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <FaArrowUp className="w-3 h-3 mr-1" />
              {delta}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Views Performance</h3>
          <ViewsLineChart />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Earnings Overview</h3>
          <EarningsBarChart />
        </div>
      </div>

      {/* Recent Posts Table with Image */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>

        {loadingPosts ? (
          <div className="text-center text-gray-500 py-8">Loading recent posts...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Image','Title','Category','Views','Earnings','Date','Actions'].map((col) => (
                    <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.views ?? '12'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.price ? `$${post.price}` : 'Free'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;