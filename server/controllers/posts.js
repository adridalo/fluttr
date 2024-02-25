const {User, Post} = require("../db/models");
const getSelfPosts = async (req, res) => {
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
            user: user,
            posts: userPosts,
        })
    } catch (e) {
        res.status(500).send({
            status: "error",
            message: e.message
        })
    }
}

const addNewPost = async (req, res) => {
    const { postContent, creationDate } = req.body;

    try {
        const user = await User.findOne({
            email: req.session.userId
        })
        const post = new Post({
            creator: user,
            postContent: postContent,
            creationDate: creationDate
        })

        await post.save()
        console.log(post)

        res.status(201).send({
            success: true,
            message: "Post added successfully"
        })
    } catch (e) {
        res.status(500).send({
            status: "error",
            message: e.message
        })
    }
}

module.exports.getSelfPosts = getSelfPosts;
module.exports.addNewPost = addNewPost;