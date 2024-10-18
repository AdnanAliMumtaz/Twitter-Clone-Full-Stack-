const { user } = require('../models/user');
const Post = require('../models/post');
const Notification = require('../models/notification');
const cloudinary = require('cloudinary').v2;

const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();

        // Finding a user
        const User = await user.findById(userId);
        if (!User) return res.status(404).json({ message: "User not found!" });

        if (!text && !img) {
            return res.status(404).json({ error: "Post must have text or image." });
        }

        // Uploading a new image
        if (img) {
            const image = await cloudinary.uploader.upload(img);
            img = image.secure_url;
        }

        // Adding a new post
        const newPost = new Post({
            postUser: User,
            text: text,
            img: img,
        });

        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error in the createPost Controller" });
    }
};

const deletePost = async (req, res) => {
    try {
        // Checking if the post exists
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found!" });

        if (post.postUser.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You are not authorised to delete this post." });
        }

        // Optimising the cloudinary by removing any image from database
        if (post.img) {
            const imgId = post.img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
        console.log("Error in deletePost controller", error.message);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

const commentOnPost = async (req, res) => {
    try {

        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if (!text) return res.status(400).json({ error: "Text field is required!" });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found!" });

        // Making a comment
        const comment = { text, postUser: userId };
        post.comments.push(comment);
        await post.save();

        return res.status(200).json(post);


    } catch (error) {
        console.log("Error in commentOnPost controller", error.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

const likeUnlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found!" });

        // Like/Unlike the post functionality
        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            // Unlike the post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });

            // Adding the posts in the liked Post section
            await user.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

            return res.status(200).json({ message: "Post unliked successfully!" });
        } else {
            // Like the post
            post.likes.push(userId);
            await user.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            await post.save();

            // Creating a notification
            const notification = new Notification({
                from: userId,
                to: post.postUser,
                type: "like"
            });
            await notification.save();

            return res.status(200).json({ message: "Post liked successfully!" });
        }

        // return res.status(200).json(post);
    } catch (error) {
        console.log("Error in likeUnlikePost controller", error.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

const getAllPosts = async (req, res) => {
    try {
        // Getting all posts
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: "postUser",
            select: "-password"
        }).populate({
            path: "comments.postUser",
            select: "-password"
        });
        if (posts.length === 0) return res.status(200).json([]);
        return res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createPost,
    deletePost,
    commentOnPost,
    likeUnlikePost,
    getAllPosts
}