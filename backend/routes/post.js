const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middlewares/protectRoute');
const { createPost } = require('../controllers/post');

router.post('/create', protectRoute, createPost);
// router.post('/like/:id', protectRoute, likeUnlikePost);
// router.post('/comment/:id', protectRoute, commentOnPost);
// router.delete('/', protectRoute, deletePost);


module.exports = router;