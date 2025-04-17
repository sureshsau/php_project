import express from 'express';
import {validateLogin, validateSignup}from '../middlewires/auth.validator.js'
import { 
    forgotPasswordController,
    googleLoginController,
    loginController, 
    logoutController, 
    resendVerificationCodeController, 
    resetPasswordController, 
    signupController,  
    verifyUserController 
} from '../controllers/auth.controller.js';

const router = express.Router();

router
    .post('/signup', validateSignup, signupController) 
    .post('/verify-user', verifyUserController)
    .post('/resend-verification-code', resendVerificationCodeController)
    //user login controller
    .post('/login',validateLogin, loginController)
    //user logout controller
    .post('/logout',logoutController)
    //forgit password controller
    .post('/forgot-password',forgotPasswordController)
    .post('/reset-password',resetPasswordController)

    .post('/google/callback',googleLoginController)

export default router;
