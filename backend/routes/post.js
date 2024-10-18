const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middlewares/protectRoute');
const { getAllPosts, createPost, deletePost, commentOnPost, likeUnlikePost } = require('../controllers/post');

// Route Api/Posts

router.get('/all', protectRoute, getAllPosts);
router.post('/create', protectRoute, createPost);
router.post('/like/:id', protectRoute, likeUnlikePost);
router.post('/comment/:id', protectRoute, commentOnPost);
router.delete('/:id', protectRoute, deletePost);


module.exports = router;