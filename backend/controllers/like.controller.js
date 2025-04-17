
import Blog from '../models/blog.model.js';

export const likeController = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const blog = await Blog.findById(blogId).select(likes);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      blog.likes = blog.likes.filter(id => id.toString() !== userId.toString());
      await blog.save();
      return res.status(200).json({ message: 'Blog unliked successfully' });
    } else {
      // Like
      blog.likes.push(userId);
      await blog.save();
      return res.status(200).json({ message: 'Blog liked successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
