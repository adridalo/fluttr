const {OAuth2Client} = require("google-auth-library");
const User = require("../db/models");
const checkAuthentication = (req, res) => {
    if(req.session && req.session.userId) {
        const userData = {
            name: req.session.name,
            picture: req.session.picture
        }

        res.status(200).json({
            status: 'success',
            data: userData
        })
    } else {
        res.status(401).json({
            status: 'error',
            message: 'Not authenticated'
        })
    }
}

const login = async (req, res) => {
    const { credential, clientId, _ } = req.body

    try {
        const client = new OAuth2Client(clientId)
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: clientId
        })
        const payload = ticket.getPayload()
        const user = await User.findOneAndUpdate({
            email: payload.email
        }, {
            $set: {
                email: payload.email,
                name: payload.name,
                picture: payload.picture
            }
        }, {
            upsert: true,
            new: true
        })

        await user.save()

        if(!req.session) {
            req.session = {}
        }

        req.session.userId = payload.email
        req.session.picture = payload.picture
        req.session.name = payload.name

        res.status(200).send({
            status: 'success',
            data: {
                name: user.name,
                picture: user.picture
            }
        })

    } catch (e) {
        console.error(e)
        res.status(500).send({
            status: "error",
            message: e.message
        })
    }
}

const logout = async (req, res) => {
    await req.session.destroy()
    res.status(200).send({
        status: 'success',
        message: 'Logout successful'
    })
}

module.exports = {
    checkAuthentication,
    login,
    logout
}