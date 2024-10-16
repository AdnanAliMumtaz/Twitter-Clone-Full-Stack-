const { user } = require('../models/user');
const { Notification } = require('../models/notification');

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

        

    } catch (error) {

    }
}


module.exports = {
    getUserProfile,
    followUnfollowUser,
    getSuggestedUsers
}