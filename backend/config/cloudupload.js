import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blogs',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const cloudupload = multer({ storage });

export default cloudupload;
