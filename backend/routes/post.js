const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middlewares/protectRoute');
const { getAllPosts, getFollowingPosts, getLikedPosts, getUserPosts, createPost, deletePost, commentOnPost, likeUnlikePost } = require('../controllers/post');

router.get('/all', protectRoute, getAllPosts);
router.get('/following', protectRoute, getFollowingPosts);
router.get('/likes/:id', protectRoute, getLikedPosts);
router.get('/user/:username', protectRoute, getUserPosts);
router.post('/create', protectRoute, createPost);
router.post('/like/:id', protectRoute, likeUnlikePost);
router.post('/comment/:id', protectRoute, commentOnPost);
router.delete('/:id', protectRoute, deletePost);

module.exports = router;