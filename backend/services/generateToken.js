const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId, res) => {
    // Sign the token with the user ID and a secret
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    // Set the token as a cookie in the response
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Prevents XSS attacks by restricting access to the cookie 
        sameSite: "strict", // Prevents CSRF attacks by ensuring the cookie is sent only for same-site requests
        // secure: process.env.NODE_ENV === "production", // Secure flag for production
    });
}

module.exports = {
    generateTokenAndSetCookie
};