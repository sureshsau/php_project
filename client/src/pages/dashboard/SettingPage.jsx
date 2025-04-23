import React, { useState, useRef } from 'react';
import AdminLayout from '../../components/AdminDashboard/AdminLayout';
import { useDispatch } from 'react-redux';

const tabs = [
  'Profile Information',
  'Account Settings',
  'Notifications',
  'Payment',
  'Blog Preferences',
  'Theme',
];

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
const auth=useDispatch(state=>state.auth.auth)

  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    bio: '',
    location: '',
    website: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    fileInputRef.current.value = null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // save formData & profileImage
    console.log('Saved:', { ...formData, profileImage });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 -mb-px font-medium ${
                activeTab === t
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab === 'Profile Information' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture */}
            <div className="grid grid-cols-3 gap-6 items-center">
              <div className="col-span-1">
                <h3 className="text-lg font-semibold mb-1">Profile Picture</h3>
                <p className="text-sm text-gray-500">
                  This will be displayed on your profile and posts.
                </p>
              </div>
              <div className="col-span-2 flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={
                      auth?.profileImage
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border"
                  />
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer text-white"
                  >
                    📷
                  </label>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-1 border rounded text-sm text-blue-600 hover:bg-blue-50"
                >
                  Upload New
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-4 py-1 border rounded text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>

            <hr />

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <p className="text-sm text-gray-500">
                Update your personal details and how others see you on the
                platform.
              </p>

              <div className="grid grid-cols-3 gap-6 items-center">
                <label className="col-span-1 font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="col-span-2 border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-6 items-center">
                <label className="col-span-1 font-medium">
                  Professional Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="col-span-2 border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-6 items-start">
                <label className="col-span-1 font-medium">Bio</label>
                <textarea
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  className="col-span-2 border px-3 py-2 rounded w-full resize-none"
                  placeholder="Brief description for your profile. URLs are hyperlinked."
                />
              </div>

              <div className="grid grid-cols-3 gap-6 items-center">
                <label className="col-span-1 font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="col-span-2 border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-6 items-center">
                <label className="col-span-1 font-medium">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="col-span-2 border px-3 py-2 rounded w-full"
                />
              </div>
            </div>

            <div className="pt-4 text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {activeTab !== 'Profile Information' && (
          <p className="text-gray-500 py-10 text-center">
            {activeTab} content coming soon…
          </p>
        )}
      </div>
    </AdminLayout>
  );
};

export default SettingPage;
