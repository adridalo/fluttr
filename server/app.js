const express = require('express');
require('google-auth-library')

const app = express();
app.use(express.json())

app.get('/api/', (req, res) => {
    res.json('Hello World!');
})

app.post('/api/login', (req, res) => {
    const results = req.body

    console.log(results)
})

module.exports = app;