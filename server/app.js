const express = require('express');
const { OAuth2Client } = require("google-auth-library");
const User = require('./db/models')
const session = require("express-session");
const generateSecret = require("./util/util");
const MongoStore = require("connect-mongo");

if(!process.env.SESSION_SECRET) {
    process.env.SESSION_SECRET = generateSecret();
}

const app = express();
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        dbName: 'fluttr',
        ttl: 60 * 60 * 1000
    })
}))

app.get('/api/', (req, res) => {
    res.json('Hello World!');
})

app.get('/api/check-auth', (req, res) => {
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
})

app.post('/api/login', async (req, res) => {
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
})

module.exports = app;