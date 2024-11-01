const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    profileImg: {
        type: String, 
        default: ""
    },
    coverImg: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    },
    likedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
            default: []
        }
    ]
}, {timestamps: true});

const User = model('User', userSchema);

module.exports = { user: User };