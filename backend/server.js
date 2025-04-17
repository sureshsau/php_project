import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoute from './routes/auth.route.js';
import credentialRouter from './routes/credential.route.js'
import  blogRouter from './routes/blog.route.js'
import likeRouter from './routes/like.route.js'
import commentRouter from './routes/comment.route.js'
import writerRoute from './routes/writer.route.js'

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL , 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Welcome Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the trading app backend!' });
});

// API Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/credential',credentialRouter);
app.use('/api/v1/blog',blogRouter);
app.use('/api/v1/blog',likeRouter);
app.use('api/v1/blog/comment',commentRouter);
app.use('/api/v1/writer',writerRoute);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    // console.error("Error:", err.stack);
    res.status(500).json({
        success: false,
        error: err.message || "Internal Server Error",
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
