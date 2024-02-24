const {checkAuthentication, login, logout} = require("../controllers/auth");
const express = require('express')

const router = express.Router()

router.get('/check-auth', checkAuthentication)

router.post('/login', login)

router.delete('/logout', logout)

module.exports = router