const express = require('express')
const router = express.Router()

const LikeControl = require('../controllers/like-controller')

router.post('/likePost/:id', LikeControl.likePost)
router.post('/unlikePost/:id', LikeControl.unlikePost)

module.exports = router

