const env = require('dotenv');
const express = require('express');
const app = express();
const { connectMongoDB } = require('../backend/db/connection');
const cookieParse = require('cookie-parser');

// ENV Variables
env.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

// Databse Connection
connectMongoDB();

// Routes
const authRoutes = require('../backend/routes/auth');
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
