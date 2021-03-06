const express = require('express')
const router = express.Router()

const AuthControl = require('../controllers/auth-controller')

router.post('/register', AuthControl.registerUser)
router.post('/login', AuthControl.loginUser)
router.get('/getID', AuthControl.getUserID)
router.post('/usernameFromID', AuthControl.getUsernameFromID)

module.exports = router