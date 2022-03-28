const express = require('express')

const UserControl = require('../controllers/user-controller')

const router = express.Router()

router.put('/:id', UserControl.updateUser)
router.delete('/:id', UserControl.deleteUser)
router.get('/:id', UserControl.getUserById)
router.get('/userLikes/:id', UserControl.getUserLikes)

module.exports = router