const express = require('express');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRouter = require('./routes/auth')
const postsRouter = require("./routes/posts");

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

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/posts', postsRouter)

module.exports = app;