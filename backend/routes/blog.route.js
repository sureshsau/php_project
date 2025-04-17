import express from 'express';
import { createBlogController, deleteBlogController, getBlogDetailsContoller, getBlogsController } from '../controllers/blog.controller.js';
import { isLoggedIn } from '../middlewires/auth.validator.js';
import { isBlogOwner, isWriter } from '../middlewires/blog.middlewire.js';
import cloudupload from '../config/cloudupload.js';

const router=express.Router();
 router
    .get("/:id",getBlogDetailsContoller)
    .get("/",getBlogsController)
    .post("/",isLoggedIn,isWriter,cloudupload.single('coverImage'),createBlogController)
    .delete("/:id",isLoggedIn,isBlogOwner,deleteBlogController)
export default router;