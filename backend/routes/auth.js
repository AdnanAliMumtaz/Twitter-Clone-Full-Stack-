const express = require('express');
const router = express.Router();
const { authCheck, signup, login, logout } = require('../controllers/auth');
const { protectRoute } = require('../middlewares/protectRoute');

//    Route:        /api/auth/
router.get('/authCheck', protectRoute, authCheck);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;

