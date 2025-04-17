import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import axios from 'axios';

import User from '../models/user.model.js';
import { sendVerificationCode, sendWelcomeEmail,sendPasswordResetEmail  } from '../mail/mail.js';
import oauth2client from '../config/google.config.js'

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
};

// Signup Controller
export const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists 
        const existingUser = await User.findOne({ email }).select('_id').lean();
        if (existingUser) {
            return res.status(400).json({ success: false, msg: "User already exists with this email address" });
        }

        // Generate password hash and OTP simultaneously
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPasswordPromise = bcrypt.hash(password, 10);

        // Wait for password hashing to finish
        const hashPassword = await hashedPasswordPromise;

        // Create user in DB without waiting for email to be sent
        const newUserPromise = User.create({
            username,
            email,
            password: hashPassword,
            verificationCode: code,
            verificationCodeExpiresAt: Date.now() + 3 * 60 * 1000, // 3 minutes
        });

        // Send verification email in parallel
        const emailPromise = sendVerificationCode(email, code);

        // Run both operations concurrently
        const [newUser, emailSent] = await Promise.all([newUserPromise, emailPromise]);
        if(!newUser){
            return res.status(500).json({
                success: false,
                msg: "User registered, but failed to create in database. Please try again.",
            });
        }
        if (!emailSent) {
            return res.status(500).json({
                success: false,
                msg: "User registered, but failed to send verification email. Please try again.",
            });
        }

        return res.json({
            success: true,
            msg: "User registered successfully. Please check your email for verification.",
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
};


// Verify OTP Controller
export const verifyUserController = async (req, res) => {
    try {
        const { verificationCode } = req.body;

        if (!verificationCode ) {
            return res.status(400).json({ success: false, msg: "verificationCode  is required" });
        }

        // Find user by OTP and check expiry
        const user = await User.findOne({
            verificationCode: verificationCode ,
            verificationCodeExpiresAt: { $gt: Date.now() },
        }).select('email username _id isVerified role').lean(); // Use lean() for faster read

        if (!user) {
            return res.status(400).json({ success: false, msg: "Invalid or expired OTP" });
        }
        if(user.isVerified){
            return res.status(400).json({ success: false, msg: "Email already verified" });
        }

        // Update user verification status and remove OTP fields in one query
        const updatePromise = User.updateOne(
            { _id: user._id },
            { 
                isVerified: true, 
                verificationCode:null,
                verificationCodeExpiresAt:null
            }
        );

        // Generate JWT token
        const token = generateToken(user?._id);

        // Send welcome email in parallel
        const emailPromise = sendWelcomeEmail(user.email, user.username);

        // Execute both operations concurrently
        const [updatedUser,emailSent]=await Promise.all([updatePromise, emailPromise]);
        if(!updatedUser){
            res.status(400).json({
                success: false,
                msg: "Failed to verify email. Please try again. user updated failed",
            })
        }
        // Set JWT cookie securely
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.json({
            success: true,
            msg: "Email verified successfully",
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                isVerified: true,
                role:user.role
            },
        });

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
};

//resend verify otp 
export const resendVerificationCodeController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, msg: "Email is required" });
        }

        // Find user & check verification status
        const user = await User.findOne({ email }).select("isVerified").lean();
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, msg: "User is already verified" });
        }

        // Generate new OTP
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryTime = Date.now() + 3 * 60 * 1000; // 3 minutes

        // Update user & send email **in parallel**
        const [updateResult, emailSent] = await Promise.all([
            User.findOneAndUpdate(
                { email },
                { verificationCode: code, verificationCodeExpiresAt: expiryTime },
                { new: true }
            ),
            sendVerificationCode(email, code)
        ]);

        if (!updateResult) {
            return res.status(500).json({ success: false, msg: "Failed to update OTP" });
        }
        if(!emailSent) {
            return res.status(500).json({ success: false, msg: "Failed to send verification email" });
        }

        return res.json({ success: true, msg: "OTP sent successfully otp will be valid till 3 minutes" });

    } catch (error) {
        console.error("Error resending OTP:", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
};





export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, msg: 'Email and password are required' });
        }

        // Find user and explicitly select password
        const user = await User.findOne({ email }).select('password username _id isVerified email googleId');

        if (!user) {
            return res.status(401).json({ success: false, msg: 'User not found' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ success: false, msg: 'User is not verified. Verify your account first.' });
        }

        if (user.googleId) {
            return res.status(400).json({
                success: false,
                msg: "This email is registered using Google. Please log in with Google."
            });
        }

        // Ensure password exists before comparison
        if (!user.password) {
            return res.status(400).json({ success: false, msg: "Invalid login method. Use Google Sign-In." });
        }

        // Compare password hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, msg: 'Incorrect password' });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Set JWT token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            success: true,
            msg: 'Logged in successfully',
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                isVerified: user.isVerified,
            },
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};




// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email }).select('_id email isVerified googleId').lean();
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }
        if (!user.isVerified) {
            return res.status(400).json({ success: false, msg: 'User is not verified. Verify your account first.' });
        }
        if(user.googleId){
            return res.status(400).json({
                success:false,
                msg:"this account is Verified using google you cannot change the password"
            })
        }

        // Generate password reset token
        const token = crypto.randomBytes(15).toString('hex');
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

        // Prepare update query
        const updateUserPromise = User.updateOne(
            { _id: user._id },
            {
                resetPasswordToken: token,
                resetPasswordTokenExpiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
            }
        );

        // Send email
        const sendEmailPromise = sendPasswordResetEmail (user.email, resetLink);

        // Execute both operations in parallel
        const [updateResult, sendEmailResult] = await Promise.all([
            updateUserPromise,
            sendEmailPromise
        ]);

        if (updateResult.modifiedCount === 0) {
            return res.status(500).json({ success: false, msg: 'Failed to update user document' });
        }

        return res.status(200).json({
            success: true,
            msg: 'Password reset link sent successfully. Please check your email.'
        });

    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};



// Reset Password Controller
export const resetPasswordController = async (req, res) => {
    try {
        
        const { token,newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ success: false, msg: 'token and newPassword are required' });
        }

        // Find user with valid reset token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now() }
        }).select('_id password');

        if (!user) {
            return res.status(400).json({ success: false, msg: 'Invalid or expired reset link' });
        }

        // Hash password & update in parallel
        const hashedPassword = bcrypt.hash(newPassword, 10);
        await Promise.all([
            User.findByIdAndUpdate(user._id, {
                password: await hashedPassword,
                $unset: { resetPasswordToken: "", resetPasswordTokenExpiresAt: "" }
            }),
        ]);

        return res.status(200).json({
            success: true,
            msg: 'Password reset successfully. Now login with your new password.'
        });

    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};


// Logout Controller
export const logoutController = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return res.status(200).json({ success: true, msg: 'Logged out successfully' });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};


export const googleLoginController = async (req, res) => {
    try {
        const { code } = req.body;
        const { tokens } = await oauth2client.getToken(code);
        oauth2client.setCredentials(tokens);
        const {data:userRes }= await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
        );
        const existingUser = await User.findOne({ email: userRes.email })
            .select("password _id email role username googleId profileImage isVerified")
            .lean();

        if (existingUser) {
            if (existingUser.googleId && existingUser.isVerified) {
                const token = generateToken(existingUser._id);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });

                return res.status(200).json({
                    success: true,
                    msg: "Login with Google successful",
                    user: {
                        id: existingUser._id,
                        username: existingUser.username,
                        email: existingUser.email,
                        role: existingUser.role,
                        profileImage: existingUser.profileImage,
                        isVerified: existingUser.isVerified,
                    }
                });
            } else if (!existingUser.googleId && existingUser.password) {
                return res.status(400).json({
                    success: false,
                    msg: "This user is already registered with email/password. Try logging in with email and password."
                });
            }
        }

        if (!userRes.verified_email) {
            return res.status(400).json({
                success: false,
                msg: "This email is not verified on Google, so it can't be used for authentication."
            });
        }
        const emailPromise = sendWelcomeEmail(userRes.email, userRes.name);
        const newUser = new User({
            username: userRes.name,
            email: userRes.email,
            isVerified: true,
            profileImage: userRes.picture,
            googleId: userRes.id
        });
        await Promise.all([newUser.save(),emailPromise]);
        
        const token = generateToken(newUser._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).json({
            success: true,
            msg: "Google sign-up successful",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                profileImage: newUser.profileImage,
                isVerified: newUser.isVerified,
            }
        });

    } catch (error) {
        console.error("Error in Google Auth:", error.stack);
        return res.status(500).json({ success: false, msg: "Google login failed" });
    }
};

