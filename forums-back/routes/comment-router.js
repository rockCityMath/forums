const express = require('express')
const router = express.Router()

const CommentControl = require('../controllers/comment-controller')

router.get('/userComments/:id', CommentControl.getUserComments)
router.post('/add/:id', CommentControl.addComment)          //post id is req param
router.post('/remove/:id', CommentControl.removeComment)    //post id is req param, comment to delete is given in req body
router.get('/:id', CommentControl.getComment)
router.get('/postComments/:id', CommentControl.getPostComments)
router.put('/updateComment/:id', CommentControl.updateComment )


module.exports = router