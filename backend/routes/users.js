const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middlewares/protectRoute');
const { getUserProfile, followUnfollowUser, getSuggestedUsers, updateUserProfile } = require('../controllers/users');

router.get('/profile/:username', protectRoute, getUserProfile);
router.get('/suggested', protectRoute, getSuggestedUsers);
router.post('/follow/:id', protectRoute, followUnfollowUser);
router.post('/updateUserProfile', protectRoute, updateUserProfile);

module.exports = router;