const Post = require('../models/post-model')
const User = require('../models/user-model')
const Comment = require('../models/comment-model');

const { response } = require('express');

const { idFromToken } = require('../auth');

addComment = async(req, res) => {

    const body = req.body
    var userID = 0

    //Get and verify userID from JWT 
    await idFromToken(req.headers['authorization'].split(" ").pop(), (decodedID) => {
        userID = decodedID
    })
    if(userID == undefined || userID == 0 ) {
        return res.status(404).json({
            message: 'You must be logged in!'
        })
    }

    //Get username from userID (to be associated with the post)
    const userFromID = await User.findOne({_id: userID}, (err, user) => {      
        if(err) {
            return res.status(404).json({
                err,
                message: 'Error searching for user...',
            })
        }
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found...` })
        }
    })  .clone().exec().catch(err => console.log(err))

    /* CREATE COMMENT OBEJCT */
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide comment info',
        })
    }
    const comment = new Comment({
        postID: req.params.id,
        username: userFromID.username,
        userID: userID,
        content: body.content
    }); 
    if (!comment) {
        console.log("400 error")
        return res.status(400).json({ success: false, error: err })
    }
        comment
        .save()
        .then(() => {
            
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Unable to create comment!',
            })
        })

    /* ADD COMMENT TO POST COMMENTS + INC COMMENT COUNT */
    const postReturn = await Post.findOne({_id: req.params.id }, (err, post) => {
        
        if(err) {
            return res.status(404).json({
                err,
                message: 'Post not found',
            })
        }
        
        //Add commentID to post's comment list
        post.comments.push(comment._id);
        post.commentCount += 1;

            post
                .save()
                .then(() => {   
                    
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'Error adding comment to post...'
                    })
                })

    }).clone()

    /* ADD COMMENT TO USER COMMENTS */
    const userReturn = await User.findOne({_id: userID }, (err, user) => {
        
        if(err) {
            return res.status(404).json({
                err,
                message: 'User not found',
            })
        }
        
        //Add commentID to user's comment list
        user.comments.push(comment._id);

            user
                .save()
                .then(() => {
                    
                    return res.status(200).json({
                        success: true,
                        id: comment._id,
                        message: 'Comment added to post!'
                    })
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'Error adding comment to user...'
                    })
                })

    }).clone()

}

removeComment = async(req, res) => {
    const body = req.body
    var userID = 0;

    await idFromToken(req.headers['authorization'].split(" ").pop(), (decodedID) => {
        userID = decodedID
    })
    if(userID == undefined || userID == 0 ) {
        return res.status(404).json({
            message: 'You must be logged in!'
        })
    }

    /* REMOVE COMMENT OBEJCT */
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide comment info',
        })
    }

    var commentID = req.body.commentID

    const commentReturn = await Comment.findOneAndDelete({ _id: commentID}, (err, comment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
    })
        .clone()
        .catch(err => console.log(err))


    /* REMOVE COMMENT FROM POST'S COMMENT LIST + DECR COMMENT COUNT */
    const postReturn = await Post.findOne({_id: req.params.id }, (err, post) => {
        
        if(err) {
            return res.status(404).json({
                err,
                message: 'Post not found',
            })
        }

        //Check that there is a userID provided
        var commentID = body.commentID
        if(commentID == 'undefined') {
            return res.status(404).json({
                err,
                message: 'You must provide a commentID',
            })
        }

        //Check for commentID in post's list of comments
        var comments = post.comments
        var found = comments.findIndex(function(element) {
            if(element == commentID) {
                return true
            }
        })

        //Remove comment if its found
        if(found != -1) {
            post.comments.splice(found, 1);
            post.commentCount -= 1;
            post
                .save()
                .then(() => {

                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'Error removing comment...'
                    })
                })
        }
        else {
            return res.status(404).json({
                err,
                message: 'This comment does not exist...',
            })
        }

    })
        .clone()
        .catch(err => console.log(err))

    if(postReturn == null) {
        return 0;
    }

    /* REMOVE COMMENT FROM USER'S COMMENTS */

    console.log("MADE IT TO USER SECTION")
    console.log(userID)

    const userReturn = User.findOne({ _id: userID }, (err, user) => {
        
        if(err) {
            return res.status(404).json({
                err,
                message: 'Comment not found',
            })
        }

        console.log(user)

        //Check for commentID in user's list of comments
        var comments = user.comments
        var found = comments.findIndex(function(element) {
            if(element == commentID) {
                return true
            }
        })

        //Remove comment if its found
        if(found != -1) {
            user.comments.splice(found, 1);
            user
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        message: 'Comment removed!'
                    })
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'Error removing comment...'
                    })
                })
        }
        else {
            return res.status(404).json({
                err,
                message: 'This comment does not exist...',
            })
        }
    }).clone()

    if(userReturn == null) {
        return 0;
    }
}

getComment = async(req, res) => {
    await Comment.find({_id: req.params.id}, (err, comment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!comment.length) {
            return res
                .status(404)
                .json({ success: false, error: `Comment not found` })
        }
        return res.status(200).json({  
            success: true,
            data: comment
        })
    })
        .clone()
        .catch(err => console.log(err))
}

getUserComments = async(req, res) => {
    await Comment.find({userID: req.params.id}, (err, comment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!comment.length) {
            return res
                .status(404)
                .json({ success: false, error: `No comments found!` })
        }
        return res.status(200).json({  
            success: true,
            data: comment
        })
    })
        .clone()
        .catch(err => console.log(err))
}

getPostComments = async(req, res) => {
    await Comment.find({postID: req.params.id}, (err, comment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!comment.length) {
            return res
                .status(404)
                .json({ success: false, error: `Comment not found` })
        }
        return res.status(200).json({  
            success: true,
            data: comment
        })
    })
        .clone()
        .catch(err => console.log(err))
}



 

module.exports = {
    addComment,
    removeComment,
    getComment,
    getUserComments,
    getPostComments
}