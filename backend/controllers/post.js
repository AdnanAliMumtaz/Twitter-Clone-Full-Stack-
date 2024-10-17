const { user } = require('../models/user');
const Post  = require('../models/post');
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


module.exports = {
    createPost,
}