import React from "react";

const BlogBanner = ({ image, title, author, date, readTime, profileImage }) => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl mb-10">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 sm:p-10 text-white">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-3">
          <img
            src={profileImage || "/avatar.jpg"}
            alt="Author"
            className="w-10 h-10 rounded-full border border-white object-cover"
          />
          <div>
            <p className="text-sm font-medium">{author || "Unknown Author"}</p>
            <p className="text-xs opacity-80">
              {new Date(date).toLocaleDateString()} • {readTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
