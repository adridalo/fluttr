const express = require('express');

const app = express();

app.get('/api/', (req, res) => {
    res.json('Hello World!');
})

module.exports = app;