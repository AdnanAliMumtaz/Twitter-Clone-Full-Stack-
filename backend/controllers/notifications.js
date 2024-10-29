const Notification = require('../models/notification');

const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        // Retrieve notifications for user
        const notifications = await Notification.find({ to: userId })
            .sort({ createdAt: -1 })
            .populate(
                {
                    path: "from",
                    select: "username profileImg"
                }
            );

        // Mark notifications as read
        await Notification.updateMany({ to: userId }, { read: true });

        return res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotifications controller", error.message);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        // Deletes all notifications to user
        await Notification.deleteMany({ to: userId });

        return res.status(200).json({ message: "Notification deleted successfully!" });

    } catch (error) {
        console.log("Error in deleteNotifications controller", error.message);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

module.exports = {
    getNotifications,
    deleteNotifications
}