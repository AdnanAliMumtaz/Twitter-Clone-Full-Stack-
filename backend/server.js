const env = require('dotenv');
const express = require('express');
const app = express();
const { connectMongoDB } = require('../backend/db/connection');

// ENV Variables
env.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Databse Connection
connectMongoDB();

// Routes
const authRoutes = require('../backend/routes/auth');
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});


// 57:21