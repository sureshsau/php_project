
import express from 'express';
import { isLoggedIn } from '../middlewires/auth.validator.js';
import { likeController } from '../controllers/like.controller.js';


const router=express.Router();
router
    .post("/:id/like",isLoggedIn,likeController)


export default router;

