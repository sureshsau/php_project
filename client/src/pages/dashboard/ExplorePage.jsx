import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminDashboard/AdminLayout';
import SearchInput from '../../components/AdminDashboard/ExplorePage/SearchInput';
import CardList from '../../components/AdminDashboard/ExplorePage/CardList';
import PopularWriters from '../../components/AdminDashboard/ExplorePage/PopularWriters';
import Recommended from '../../components/AdminDashboard/ExplorePage/Recomended';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const ExplorePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Topics'); // use 'All Topics' for default (or empty)

  // Create a function to fetch blogs with current filter and search query
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // Build query parameters based on state
      const params = {};
      if (category && category !== 'All Topics') {
        params.category = category;
      }
      if (search.trim().length > 0) {
        params.search = search.trim();
      }
      const { data } = await axiosInstance.get('/blog', { params });
      if (data?.success) {
        console.log(data);
        setBlogs(data.blogs);
      } else {
        setBlogs([]);
        toast.info(data.message || 'No blogs found');
      }
    } catch (error) {
      toast.error('Error fetching blogs. Try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect fires initially and when search/category changes
  useEffect(() => {
    fetchBlogs();
  }, [search, category]);

  return (
    <AdminLayout>
      <SearchInput
        value={search}
        setValue={setSearch}
        category={category}
        setCategory={setCategory}
      />
      {loading ? (
        <div>Loading blogs...</div>
      ) : (
        <>
          <CardList blogs={blogs} />
          <PopularWriters />
          
        </>
      )}
    </AdminLayout>
  );
};

export default ExplorePage;
