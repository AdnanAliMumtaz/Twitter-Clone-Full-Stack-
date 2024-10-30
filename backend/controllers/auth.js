const { user } = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateTokenAndSetCookie } = require('../services/generateToken');

const signup = async (req, res) => {

    try {
        const { username, fullName, email, password } = req.body;

        // Basic email format check (e.g., example@gmail.com)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        // Check if username or email already exists
        const existingUser = await user.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (existingUser) {
            const errorMessage = existingUser.username === username ? "Username already taken." : "Email already taken.";
            return res.status(400).json({ error: errorMessage });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be atleast 6 characters long!" });
        }

        // Hash the password and create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new user({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res); // Sets auth token
            await newUser.save();

            // Send basic user data in response
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers || [],
                following: newUser.following || [],
                profileImg: newUser.profileImg || null,
                coverImg: newUser.coverImg || null
            });
        } else {
            return res.status(400).json({ error: "Invalid User Data!" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username in database
        const User = await user.findOne({ username });

        // Check if user exists and password is correct
        const isPasswordCorrect = await bcrypt.compare(password, User?.password || '');
        if (!User || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Credentials!" });
        }

        generateTokenAndSetCookie(User._id, res); // Sets auth token

        // Send basic user data in response
        return res.status(200).json({
            _id: User._id,
            fullName: User.fullName,
            username: User.username,
            email: User.email,
            followers: User.followers || [],
            following: User.following || [],
            profileImg: User.profileImg || null,
            coverImg: User.coverImg || null,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};

const logout = async (req, res) => {
    try {
        // Clears the JWT cookie to logout
        res.cookie("jwt", "", { maxAge: 0 });

        return res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
        console.log("Error in logout functionality:", error.message)
    }
};

const authCheck = async (req, res) => {
    try {
        // Retrieve user by ID, excluding the password field
        const User = await user.findById(req.user._id).select("-password");
        return res.status(200).json(User);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};

module.exports = {
    signup,
    login,
    logout,
    authCheck
};