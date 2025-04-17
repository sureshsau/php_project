import { Heart, MessageCircle, Eye } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ id, tag, image, author, date, title, description, views, likes, comments }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${id}`);
  };

  useEffect(() => {}, []);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-44 object-cover" />
        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white rounded ${
          tag === 'TRENDING' ? 'bg-blue-600' : 'bg-green-600'
        }`}>
          {tag}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center text-xs text-gray-500 gap-2 mb-1">
          <span>{author}</span>•<span>{date}</span>
        </div>
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="flex items-center justify-between mt-4 text-gray-500 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{views}</span>
            <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{likes}</span>
            <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" />{comments}</span>
          </div>
          <button
            onClick={handleReadMore}
            className="text-blue-600 font-medium text-sm hover:underline"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
