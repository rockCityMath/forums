const express = require('express')
const router = express.Router()

const CommentControl = require('../controllers/comment-controller')

router.post('/add/:id', CommentControl.addComment)          //post id is req param
router.post('/remove/:id', CommentControl.removeComment)    //post id is req param, comment to delete is given in req body

module.exports = router