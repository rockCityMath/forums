const express = require('express')

const UserControl = require('../controllers/user-controller')

const router = express.Router()

router.post('/', UserControl.createUser)
router.put('/:id', UserControl.updateUser)
router.delete('/:id', UserControl.deleteUser)
router.get('/:id', UserControl.getUserById)
router.get('/', UserControl.getUsers)

module.exports = router