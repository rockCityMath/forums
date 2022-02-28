const express = require('express')

const PostControl = require('../controllers/post-controller')
const jwtAuth = require('../auth')

const router = express.Router()

router.get('/mostLiked', PostControl.getMostLikedPosts)
router.get('/mostRecent', PostControl.getMostRecentPosts)
router.post('/', jwtAuth, PostControl.createPost)
router.get('/:id', PostControl.getPostById)
router.delete('/:id', PostControl.deletePost)
router.get('/', PostControl.getPosts)

module.exports = router