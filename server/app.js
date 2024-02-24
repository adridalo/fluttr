const express = require('express');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRouter = require('./routes/auth')

const app = express();
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        dbName: 'fluttr',
        ttl: 86400000
    })
}))

app.use('/api/v1', authRouter)

module.exports = app;