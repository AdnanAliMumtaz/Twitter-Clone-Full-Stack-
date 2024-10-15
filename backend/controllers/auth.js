const { user } = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateTokenAndSetCookie } = require('../services/generateToken');

const signup = async (req, res) => {

    try {
        const { username, fullName, email, password } = req.body;

        // Validate the email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        // Check if the user already exists
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

        // Creating a new user
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be atleast 6 characters long!" });
        }

        //// Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new user({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
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
            res.status(400).json({ error: "Invalid User Data!" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Finding user in database
        const User = await user.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, User?.password || '');

        if (!User || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Credentials!" });
        }

        generateTokenAndSetCookie(User._id, res);

        res.status(200).json({
            _id: User._id,
            fullName: User.fullName,
            username: User.username,
            email: User.email,
            followers: User.followers || [],
            following: User.following || [],
            profileImg: User.profileImg || null,
            coverImg: User.coverImg || null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully!"});
    } catch (error) {
        console.log("Error in logout functionality:", error.message)
    }
};


module.exports = {
    signup,
    login,
    logout
};