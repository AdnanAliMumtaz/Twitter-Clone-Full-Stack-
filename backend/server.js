const express = require('express');
const app = express();

// Routes
const authRoutes = require('../backend/routes/auth');




app.use('/api/auth', authRoutes);


app.listen(8000, () => {
    console.log('Server is running at 8000');
});


// 15:30