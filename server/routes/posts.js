const express = require('express');
const { User, Post } = require('../db/models');
const {getSelfPosts, addNewPost, getAllPosts} = require("../controllers/posts");
const postsRouter = express.Router()

postsRouter.get('/getSelfPosts', getSelfPosts)
postsRouter.get('/getAllPosts', getAllPosts)
postsRouter.post('/addPost', addNewPost)

module.exports = postsRouter