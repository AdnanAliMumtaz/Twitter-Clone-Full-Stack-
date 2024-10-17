const env = require('dotenv');
const express = require('express');
const app = express();
const { connectMongoDB } = require('../backend/db/connection');
const cookieParse = require('cookie-parser');
const authRoutes = require('../backend/routes/auth');
const userRoutes = require('../backend/routes/users');
const cloudinary = require('cloudinary').v2;

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

// Databse Connection
connectMongoDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});



