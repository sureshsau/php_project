import express from 'express';
import { addCredentialController, getCredentialController } from '../controllers/credential.controller.js';

const router=express.Router();

router
    .post("/",addCredentialController)
    .get("/",getCredentialController)

export default router