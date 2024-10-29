const { user } = require('../models/user');
const jwt = require('jsonwebtoken');

const protectRoute = async (req, res, next) => {
    try {

        // Access the token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorised: No Token Provided!" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorised: Invalid JWT Token!" })
        }

        // Find user by ID
        const User = await user.findById(decoded.userId).select("-password");
        if (!User) {
            return res.status(401).json({ error: "User not found!" });
        }

        // Attach the user object to the response
        req.user = User;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    protectRoute
}