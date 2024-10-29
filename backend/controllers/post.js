const { user } = require('../models/user');
const Post = require('../models/post');
const Notification = require('../models/notification');
const cloudinary = require('cloudinary').v2;

const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();

        // Finding a user by ID
        const User = await user.findById(userId);
        if (!User) return res.status(404).json({ message: "User not found!" });

        // Ensuring the post has either text or image to upload it
        if (!text && !img) {
            return res.status(404).json({ error: "Post must have text or image." });
        }

        if (img) {
            const image = await cloudinary.uploader.upload(img);
            img = image.secure_url;
        }

        // Creating a new post to store in database
        const newPost = new Post({
            postUser: User,
            text: text,
            img: img,
        });
        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Error in the createPost Controller" });
    }
};

const getLikedPosts = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find a user by ID
        const User = await user.findById(userId);
        if (!User) return res.status(404).json({ error: "User not found!" });

        // Finding posts liked by the user
        const likedPost = await Post.find({ _id: { $in: User.likedPosts } })
            .populate({
                path: "postUser",
                select: "-password"
            })
            .populate({
                path: "comments.postUser",
                select: "-password"
            });

        return res.status(200).json(likedPost);
    } catch (error) {
        console.log("Error in getLikedPosts controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getFollowingPosts = async (req, res) => {
    try {
        const userId = req.user._id;

        // Finding a user by ID
        const User = await user.findById(userId);
        if (!User) return res.status(404).json({ error: "User not found!" });

         // Get posts from users, the current use is following
        const following = User.following;
        const feedPosts = await Post.find({ postUser: { $in: following } })
            .sort({ createdAt: -1 })    
            .populate({
                path: "postUser",
                select: "-password"
            })
            .populate({
                path: "comments.postUser",
                select: "-password"
            });

        return res.status(200).json(feedPosts);
    } catch (error) {
        console.log("Error in getLikedPosts controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;

        // Finding the user by ID
        const User = await user.findOne({ username });
        if (!user) return res.status(404).json({error: "User not found!"});

        // Getting the posts created by the user
        const posts = await Post.find({postUser: User._id})
        .sort({createdAt: -1})
        .populate({
            path: "postUser",
            select: "-password"
        })
        .populate({
            path: "postUser",
            select: "-password"
        });

        return res.status(200).json(posts);

    } catch (error) {
        console.log("Error in getUserPosts controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deletePost = async (req, res) => {
    try {

        // Check if the post exists
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found!" });

        if (post.postUser.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You are not authorised to delete this post." });
        }

        // Deleting the image from database and cloudinary
        if (post.img) {
            const imgId = post.img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imgId);
        }
        await Post.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
        console.log("Error in deletePost controller", error.message);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};

const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        // Validate the comment is provided
        if (!text) return res.status(400).json({ error: "Text field is required!" });

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found!" });

        // Create & Push new comment
        const comment = { text, postUser: userId };
        post.comments.push(comment);
        await post.save();

        return res.status(200).json(post);
    } catch (error) {
        console.log("Error in commentOnPost controller", error.message);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

const likeUnlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        let updateLikes = 0;

        // Find the by postId
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found!" });

        // Determine if the user has liked the post
        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            // Unlike the post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            await user.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

            updateLikes = post.likes.filter(id => id.toString() !== userId.toString());

            return res.status(200).json(updateLikes);
        } else {
            // Like the post
            post.likes.push(userId);
            await user.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            await post.save();

            // Creates a notification for the like action
            const notification = new Notification({
                from: userId,
                to: post.postUser,
                type: "like"
            });
            await notification.save();

            updateLikes = post.likes;
            return res.status(200).json(updateLikes);
        }
    } catch (error) {
        console.log("Error in likeUnlikePost controller", error.message);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

const getAllPosts = async (req, res) => {
    try {
        // Get all the posts in database
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: "postUser",
            select: "-password"
        }).populate({
            path: "comments.postUser",
            select: "-password"
        });

        // Return an empty array if no posts are found
        return res.status(200).json(posts.length ? posts : []);
    } catch (error) {
        console.log("Error in getAllPosts controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createPost,
    getFollowingPosts,
    getLikedPosts,
    getUserPosts,
    deletePost,
    commentOnPost,
    likeUnlikePost,
    getAllPosts
}