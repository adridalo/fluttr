const express = require('express');
const {OAuth2Client} = require("google-auth-library");
const User = require('./db/models')
const session = require("express-session");
const crypto = require('crypto');

const generateSecret = () => {
    return crypto.randomBytes(32).toString('hex');
}

if(!process.env.SESSION_SECRET) {
    process.env.SESSION_SECRET = generateSecret();
}

const app = express();
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.get('/api/', (req, res) => {
    res.json('Hello World!');
})

app.post('/api/login', async (req, res) => {
    const { credential, clientId, _ } = req.body

    async function verify(clientId, jwtToken) {
        const client = new OAuth2Client(clientId)
        const ticket = await client.verifyIdToken({
            idToken: jwtToken,
            audience: clientId
        })

        return ticket.getPayload()
    }

    const payload = await verify(clientId, credential)
    if(payload) {
        const user = await User.updateOne({
            email: payload.email
        }, {
            $set: {
                email: payload.email,
                name: payload.name,
                pfp: payload.picture
            }
        }, {
            upsert: true
        })

        req.session.userId = user.email

        user.save()
    }

})

module.exports = app;