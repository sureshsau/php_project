import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
    },
    freeContent: {
      type: String,
      required: true,
    },
    paidContent: {
      type: String,
      default: '',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    coverImage: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      default: 'General',
    },
    readTime: {
      type: String,
      default: '3 min read',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Blog', blogSchema);
