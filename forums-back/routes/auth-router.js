const express = require('express')
const router = express.Router()

const AuthControl = require('../controllers/auth-controller')

router.post('/register', AuthControl.registerUser)
router.post('/login', AuthControl.loginUser)

module.exports = router