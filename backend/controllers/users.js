const { user } = require('../models/user');
const Notification = require('../models/notification');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;


const getUserProfile = async (req, res) => {

    try {
        const { username } = req.params;

        // Finding the user in the database
        const User = await user.findOne({ username }).select("-password");
        if (!User) return res.status(404).json({ message: "User not found!" });

        return res.status(200).json(User);
    } catch (error) {
        console.log("Error in getUserProfile controller function", error.message);
        res.status(500).json({ error: error.message });
    }
}

const followUnfollowUser = async (req, res) => {
    try {
        // Finding the users in the database
        const { id } = req.params;
        const userToModify = await user.findById(id);
        const currentUser = await user.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "You can't follow/unfollow yourself!" });
        }

        if (!userToModify || !currentUser) {
            return res.status(400).json({ error: "User not found!" });
        }

        // Follow/Unfollow operations
        const isFollowing = currentUser.following.includes(id);
        if (isFollowing) {
            // Unfollow the user
            await user.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            await user.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            return res.status(200).json({ message: "User unfollowed successfully!" });
        } else {
            // Follow the user
            await user.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            await user.findByIdAndUpdate(req.user._id, { $push: { following: id } }); 4

            // Sending the notification to the user
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id
            });

            await newNotification.save();


            return res.status(200).json({ message: "User followed successfully!" });
        }

    } catch (error) {
        console.log("Error in followUnfollowUser controller function", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const userFollowedByMe = await user.findById(userId).select("following");

        const Users = await user.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            },
            { $sample: { size: 10 } }
        ]);

        const filteredUsers = Users.filter(User => !userFollowedByMe.following.includes(User._id));

        const suggestedUsers = filteredUsers.slice(0, 4);
        suggestedUsers.forEach(user => user.password = null);

        return res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("Error in getSuggestedUsers: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
        let { profileImg, coverImg } = req.body;
        const userId = req.user._id;

        // Fetch the user 
        let User = await user.findById(userId);
        if (!User) return res.status(404).json({ error: "User not found! " });

        if (currentPassword && newPassword) {

            // Validate the new password length
            if (newPassword.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters long." });

            // Check if the password is correct
            const isMatch = await bcrypt.compare(currentPassword, User.password);
            if (!isMatch) return res.status(400).json({ error: "Current password is incorrect." });

            // Encrypt the new password
            const salt = await bcrypt.genSalt(10);
            User.password = await bcrypt.hash(newPassword, salt);
        } else if ( currentPassword || newPassword ) {
            return res.status(400).json({ error: "Please provide both current password and new password." });
        }

        if (profileImg) {
            if (User.profileImg) {
                await cloudinary.uploader.destroy(User.profileImg.split('/').pop().split('.')[0]);
            }

            const image = await cloudinary.uploader.upload(profileImg);
            profileImg = image.secure_url;
        }

        if (coverImg) {
            if (User.coverImg) {
                await cloudinary.uploader.destroy(User.coverImg.split('/').pop().split('.')[0]);
            }

            const image = await cloudinary.uploader.upload(coverImg);
            coverImg = image.secure_url;
        }

        // Updating the user details
        User.fullName = fullName || User.fullName;
        User.email = email || User.email;
        User.username = username || User.username;
        User.bio = bio || User.bio;
        User.link = link || User.link;
        User.profileImg = profileImg || User.profileImg;
        User.coverImg = coverImg || User.coverImg;

        User = await User.save();

        // Password shouldn't return in response
        User.password = null;

        return res.status(200).json(User);

    } catch (error) {
        console.error("Error in updateUser", error.message);
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getUserProfile,
    followUnfollowUser,
    getSuggestedUsers,
    updateUserProfile
}