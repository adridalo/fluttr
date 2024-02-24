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
    picture: {
        type: String,
        required: true
    },
});

const postSchema = new mongoose.Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    postContent: {
        type: String,
        required: true,
    }
})

module.exports.User = mongoose.model('User', userSchema)
module.exports.Post = mongoose.model('Post', postSchema)