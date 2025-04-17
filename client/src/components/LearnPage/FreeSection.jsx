import React, { useState } from "react";

const videoData = {
  "Data Procurement": [
    { title: "Introduction to Data Procurement", url: "https://www.youtube.com/embed/EeonWxtPM_4?si=UMEEI_qsKWCzFGIs" },
    { title: "Advanced Data Procurement Techniques", url: "https://www.youtube.com/embed/video2" },
    { title: "Introduction to Data Procurement", url: "https://www.youtube.com/embed/EeonWxtPM_4?si=UMEEI_qsKWCzFGIs" },
    { title: "Advanced Data Procurement Techniques", url: "https://www.youtube.com/embed/video2" },
    { title: "Introduction to Data Procurement", url: "https://www.youtube.com/embed/EeonWxtPM_4?si=UMEEI_qsKWCzFGIs" },
    { title: "Advanced Data Procurement Techniques", url: "https://www.youtube.com/embed/video2" },
  ],
  "Data Cleaning": [
    { title: "Data Cleaning Basics", url: "https://www.youtube.com/embed/video3" },
    { title: "Handling Missing Data", url: "https://www.youtube.com/embed/video4" },
  ],
  "Backtesting": [
    { title: "Understanding Backtesting", url: "https://www.youtube.com/embed/video5" },
  ],
  "Execution": [],
  "Trading System Development": [],
  "Discussions": [],
  "Talks": [],
  "Miscellaneous": [],
  "Alert Systems": [],
};

const FreeSection = () => {
  const [selectedSection, setSelectedSection] = useState(Object.keys(videoData)[0]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Section Navbar */}
      <div className="flex overflow-x-auto space-x-3 pb-4  no-scrollbar custom-scrollbar">
        {Object.keys(videoData).map((section, index) => (
          <button
            key={index}
            className={`px-3 py-2 text-xs font-medium rounded-sm transition-all duration-300 whitespace-nowrap ${
              selectedSection === section
                ? "bg-blue-900 text-white shadow-lg scale-105"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Videos Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedSection}</h3>
        {videoData[selectedSection].length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoData[selectedSection].map((video, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-105">
                <h4 className="font-semibold text-sm text-gray-900 mb-2">{video.title}</h4>
                <div className="overflow-hidden rounded-lg">
                  <iframe
                    className="w-full h-40 md:h-48 rounded-lg"
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No videos available for this section.</p>
        )}
      </div>

      {/* Custom Styles for Scrollbar Hiding */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .custom-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default FreeSection;
