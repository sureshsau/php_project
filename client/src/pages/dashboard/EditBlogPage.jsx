import React, { useState } from 'react';
import TitleInput from '../../components/AdminDashboard/CreateBlogPage/TitleInput';
import CategorySelect from '../../components/AdminDashboard/CreateBlogPage/CategorySelect';
import FeaturedImageUploader from '../../components/AdminDashboard/CreateBlogPage/FeaturedImageUploader';
import TagInput from '../../components/AdminDashboard/CreateBlogPage/TagInput';
import SummaryInput from '../../components/AdminDashboard/CreateBlogPage/SummaryInput';
import BlogEditor from '../../components/AdminDashboard/CreateBlogPage/BlogEditor';
import AdminLayout from '../../components/AdminDashboard/AdminLayout';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBlogPage = () => {
      const [title, setTitle] = useState('');
      const [category, setCategory] = useState('');
      const [featuredImage, setFeaturedImage] = useState(null);
      const [preview, setPreview] = useState(null);
      const [tags, setTags] = useState([]);
      const [summary, setSummary] = useState('');
      const [content, setContent] = useState('');
      const [isPaid, setIsPaid] = useState(false);
      const [price, setPrice] = useState(0);
      const [paidContent, setPaidContent] = useState('');
      const [loading, setLoading] = useState(false);
    
      const handleImageChange = (file) => {
        setFeaturedImage(file);
        setPreview(URL.createObjectURL(file));
      };
    
      const handleSubmit = async () => {
        if (!title || !summary || !content) {
          toast.warning('Please fill in all required fields (title, summary, content)');
          return;
        }
      
        if (isPaid && (!price || Number(price) <= 0)) {
          toast.warning('Price must be greater than 0 for paid content');
          return;
        }
      
        try {
          const formData = new FormData();
      
          formData.append('title', title);
          formData.append('category', category || '');
          formData.append('summary', summary);
          formData.append('freeContent', content);
          formData.append('isPaid', isPaid ? 'true' : 'false');
          formData.append('price', isPaid ? price.toString() : '0');
          formData.append('paidContent', isPaid ? paidContent : '');
      
          if (featuredImage instanceof File) {
            formData.append('coverImage', featuredImage);
          }
      
          tags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
          });
      
          // Debug form data
          for (let [key, value] of formData.entries()) {
            console.log(key, value);
          }
      
          setLoading(true);
      
          const { data } = await axiosInstance.post('/blog', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          if (data?.success) {
            toast.success('Blog created successfully!');
            console.log('Blog created:', data);
          }
        } catch (error) {
          console.error(error);
          toast.error(error?.response?.data?.message || 'Error creating blog');
        } finally {
          setLoading(false);
        }
      };
      return (
        <AdminLayout>
          <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
    
            <TitleInput title={title} setTitle={setTitle} />
            <CategorySelect category={category} setCategory={setCategory} />
            <FeaturedImageUploader onChange={handleImageChange} preview={preview} />
            <TagInput tags={tags} setTags={setTags} />
    
            {/* Free Content Editor */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Free Content</h2>
              <BlogEditor
                onContentChange={setContent}
                initialContent={content}
                editorKey="free-content"
              />
            </div>
    
            <SummaryInput summary={summary} setSummary={setSummary} />
    
            {/* Paid Content Section */}
            <div className="mb-6">
              <label className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  checked={isPaid}
                  onChange={(e) => setIsPaid(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-lg font-medium">Is Paid Content</span>
              </label>
    
              {isPaid && (
                <>
                  <div className="mb-4">
                    <label className="text-lg font-semibold mb-2 block">
                      Price (in ₹)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter price for full content access"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">Paid Content</h2>
                    <BlogEditor
                      onContentChange={setPaidContent}
                      initialContent={paidContent}
                      editorKey="paid-content"
                    />
                  </div>
                </>
              )}
            </div>
    
            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`inline-block px-6 py-3 rounded font-medium transition ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {loading ? 'Submitting...' : 'Submit Blog'}
              </button>
            </div>
          </div>
        </AdminLayout>
      );
    };

export default EditBlogPage