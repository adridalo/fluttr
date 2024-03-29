const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    bio: {
        type: String,
        default: 'Putting myself out there.'
    },
    picture: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    postContent: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports.User = mongoose.model('User', userSchema)
module.exports.Post = mongoose.model('Post', postSchema)