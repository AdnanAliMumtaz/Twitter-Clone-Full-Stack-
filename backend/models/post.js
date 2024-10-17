const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    postUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
    },
    img: {
        type: String,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            postUser: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        }
    ]
}, {timestamps: true});

const Post = model("Post", postSchema);

module.exports = Post;