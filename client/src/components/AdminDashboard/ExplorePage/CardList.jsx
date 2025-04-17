import React from 'react';
import Card from './BlogCard';

const CardList = ({ blogs }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((post) => (
        <Card
        id={post._id}
          key={post._id}
          tag={post.tags?.[0] || 'GENERAL'}
          image={post.coverImage}
          author={post.author?.username || 'Unknown'}
          date={new Date(post.createdAt).toLocaleDateString()}
          title={post.title}
          description={post.summary}
          views={post.views}
          likes={post.likes?.length || 0}
          comments={0} // Add comment count if available
        />
      ))}
    </div>
  );
};

export default CardList;
