
const express = require('express')

const UserControl = require('../controllers/user-controller')

const router = express.Router()

router.post('/user', UserControl.createUser)

module.exports = router