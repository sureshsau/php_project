import express from 'express';
import { isLoggedIn } from '../middlewires/auth.validator.js';

const router=express.Router();
router
    .post('/:id',isLoggedIn)

export default router;