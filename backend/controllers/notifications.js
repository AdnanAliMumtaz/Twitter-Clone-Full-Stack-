const Notification = require('../models/notification');


const getNotifications = async (req, res) => {
    try {
        // Find the notification for the user
        const userId = req.user._id;
        const notifications = await Notification.find({ to: userId })
            .sort({ createdAt: -1 })
            .populate(
                {
                    path: "from",
                    select: "username profileImg"
                }
            );
        await Notification.updateMany({ to: userId }, { read: true });

        return res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotifications controller", error.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

const deleteNotifications = async (req, res) => {
    try {
        // Deleting the notification for the user
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId });

        return res.status(200).json({ message: "Notification deleted successfully!" });

    } catch (error) {
        console.log("Error in deleteNotifications controller", error.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

module.exports = {
    getNotifications,
    deleteNotifications
}