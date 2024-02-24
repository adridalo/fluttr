const express = require('express');
const { OAuth2Client } = require("google-auth-library");
const User = require('./db/models')
const session = require("express-session");
const generateSecret = require("./util/util");
const MongoStore = require("connect-mongo");
const {checkAuthentication, login} = require("./controllers/auth");
const authRouter = require('./routes/auth')

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

app.use('/api/v1', authRouter)

module.exports = app;