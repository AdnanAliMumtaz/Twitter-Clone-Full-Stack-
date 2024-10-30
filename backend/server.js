const env = require('dotenv');
const path = require('path');
const express = require('express');
const app = express();
const { connectMongoDB } = require('../backend/db/connection');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const notificationsRoutes = require('./routes/notifications');
const cloudinary = require('cloudinary').v2;
const postRoutes = require('./routes/post');

// Configurations
env.config();
cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
);

// Middlewares
app.use(cookieParser());
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({ extended: true }));

// Databse Connection
connectMongoDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationsRoutes);

// 
if (process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Starts the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});