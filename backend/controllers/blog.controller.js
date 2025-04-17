import Blog from '../models/blog.model.js';



export const createBlogController = async (req, res) => {
  try {
    const title = req.body.title;
    const summary = req.body.summary;
    const freeContent = req.body.freeContent;
    const paidContent = req.body.paidContent;
    const isPaid = req.body.isPaid === 'true';
    const price = parseFloat(req.body.price) || 0;
    const tags = Array.isArray(req.body.tags)
      ? req.body.tags
      : req.body.tags?.split(',') || [];
    const category = req.body.category;

    if (!title || !summary || !freeContent || typeof isPaid !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
      });
    }

    if (isPaid && price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be greater than 0 for paid content',
      });
    }

    const coverImage = req.file?.path;
    if (!coverImage) {
      return res.status(400).json({
        success: false,
        message: "Please upload cover image"
      });
    }

    const newBlog = new Blog({
      title,
      summary,
      freeContent,
      paidContent: isPaid ? paidContent : '',
      isPaid,
      price: isPaid ? price : 0,
      coverImage,
      tags,
      category,
      author: req.user._id,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog: newBlog,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


export const deleteBlogController = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBlogDetailsContoller = async (req, res) => {
  try {
    const blogId = req.params.id;

    if (!blogId) {
      return res.status(400).json({ message: 'Blog ID is required' });
    }

    const blog = await Blog.findById(blogId).populate('author','username email profileImage');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    // Optional: Increase view count
    blog.views += 1;
    await blog.save();

    res.status(200).json({success:true, message: 'Blog fetched successfully', blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getBlogsController = async (req, res) => {
  try {
    const { category, tag, isPaid, author, search } = req.query;
    
    const filter = {};

    if (category && category !== 'All Topics') {
      filter.category = category;
    }

    if (tag) {
      filter.tags = { $in: [tag] };
    }

    if (isPaid === 'true' || isPaid === 'false') {
      filter.isPaid = isPaid === 'true';
    }

    if (author) {
      filter.author = author;
    }

    // Add search filter based on title (case insensitive)
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    // Adjusted select to only return fields used in the card
    const blogs = await Blog.find(filter)
      .populate('author', 'username')
      .select('title summary coverImage tags createdAt views likes category') 
      .sort({ createdAt: -1 });

    if (blogs.length > 0) {
      res.status(200).json({ success: true, message: 'Blogs fetched successfully', blogs });
    } else {
      res.status(200).json({ success: false, message: 'No blogs found', blogs: [] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const editBlogController = async (req, res) => {
  try {
    const blogId = req.params.id;

    const {
      title,
      summary,
      freeContent,
      paidContent,
      isPaid,
      price,
      tags,
      category,
    } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    blog.title = title || blog.title;
    blog.summary = summary || blog.summary;
    blog.freeContent = freeContent || blog.freeContent;
    blog.isPaid = isPaid === 'true';

    if (blog.isPaid) {
      if (!paidContent || parseFloat(price) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Paid content and valid price are required',
        });
      }
      blog.paidContent = paidContent;
      blog.price = parseFloat(price);
    } else {
      blog.paidContent = '';
      blog.price = 0;
    }

    if (tags) {
      blog.tags = Array.isArray(tags) ? tags : tags.split(',');
    }

    blog.category = category || blog.category;

    if (req.file?.path) {
      blog.coverImage = req.file.path;
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      blog,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};



