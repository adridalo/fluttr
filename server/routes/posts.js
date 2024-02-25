const express = require('express');
const { User, Post } = require('../db/models');
const {getSelfPosts} = require("../controllers/posts");
const postsRouter = express.Router()

postsRouter.get('/getSelfPosts', getSelfPosts)

module.exports = postsRouter