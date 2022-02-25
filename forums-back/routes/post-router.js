const express = require('express')

const PostControl = require('../controllers/post-controller')

const router = express.Router()

router.post('/', PostControl.createPost)
router.get('/:id', PostControl.getPostById)

module.exports = router