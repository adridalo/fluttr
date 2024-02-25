const express = require('express');
const { User, Post } = require('../db/models');
const postsRouter = express.Router()

postsRouter.get('/getSelfPosts', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.session.userId
        })

        if(!user) {
            res.status(404).send({
                status: 404,
                message: 'User not found'
            });
        }

        const userPosts = await Post.find({
            creator: user
        })

        res.status(200).send({
            success: true,
            data: userPosts
        })
    } catch (e) {
        res.status(500).send({
            status: "error",
            message: e.message
        })
    }
})

module.exports = postsRouter