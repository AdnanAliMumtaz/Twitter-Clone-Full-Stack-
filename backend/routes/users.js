const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middlewares/protectRoute');
const { getUserProfile, followUnfollowUser, getSuggestedUsers } = require('../controllers/users');


//    Route:        /api/users/
router.get('/profile/:username', protectRoute, getUserProfile);
router.get('/suggested', protectRoute, getSuggestedUsers);
router.post('/follow/:id', protectRoute, followUnfollowUser);
// router.get('/profile/:username', protectRoute, getUserProfile);

module.exports = router;