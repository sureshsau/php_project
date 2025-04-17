import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import FreeSection from '../components/LearnPage/FreeSection';

const LearnPage = () => {
  const [activeSection, setActiveSection] = useState('free');

  return (
    <Layout>
      <div className="flex flex-col items-center w-screen p-4 mt-15">
        <div className="flex p-3  mb-8">
          <button
            onClick={() => setActiveSection('free')}
            className={`px-6 py-2 rounded-sm font-semibold transition-colors ${
              activeSection === 'free'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Free Courses
          </button>
          <button
            onClick={() => setActiveSection('paid')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              activeSection === 'paid'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Paid Courses
          </button>
        </div>
        {/* Content for Free and Paid Courses sections */}
        {activeSection === 'free' ? (
          <div>
            {/* Free Courses Content */}
            <FreeSection/>
          </div>
        ) : (
          <div>
            {/* Paid Courses Content */}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LearnPage;
