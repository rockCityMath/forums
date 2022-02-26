const express = require('express')

const PostControl = require('../controllers/post-controller')

const router = express.Router()

router.post('/', PostControl.createPost)
router.get('/:id', PostControl.getPostById)
router.post('/likePost/:id', PostControl.likePost)
router.post('/unlikePost/:id', PostControl.unlikePost)

module.exports = router