const express = require('express')

const UserControl = require('../controllers/user-controller')

const router = express.Router()

router.put('/:id', UserControl.updateUser)
router.delete('/:id', UserControl.deleteUser)
router.get('/:id', UserControl.getUserById)
router.get('/stats/:id', UserControl.getUserStats)
router.get('/', UserControl.getUsers)
router.put('/updateAdmin/:id', UserControl.updateAdmin)

module.exports = router

