const { find } = require('../models/post-model');
const Post = require('../models/post-model');
const User = require('../models/user-model')

createPost = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide post info',
        })
    }

    //Modify if model changes
    const post = new Post({
        userID : body.userID,
        content : body.content,
        tags : body.tags,
        usersThatHaveLiked: body.usersThatHaveLiked,
        comments: body.comments
    }); 

    if (!post) {
        console.log("400 error")
        return res.status(400).json({ success: false, error: err })
    }

    post
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: post._id,
                message: 'Post created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Post not created!',
            })
        })
}

getPostById = async (req, res) => {
    await Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!post) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }
        return res.status(200).json({ success: true, data: post })
    }).catch(err => console.log(err))
}

getPosts = async (req, res) => {
    await Post.find({}, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!posts.length) {
            return res
                .status(404)
                .json({ success: false, error: `Posts not found` })
        }
        return res.status(200).json({ success: true, data: posts })
    }).catch(err => console.log(err))
}

deletePost = async (req, res) => {
    await Post.findOneAndDelete({ _id: req.params.id }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!post) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }

        return res.status(200).json({ success: true, data: post})
    }).catch(err => console.log(err))
}

likePost = async(req, res) => {
    const body = req.body;

    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a userID',
        })
    }

    //Update post like count and add user id to list of likes
    await Post.findOne({_id: req.params.id }, (err, post) => {
        
        if(err) {
            return res.status(404).json({
                err,
                message: 'Post not found',
            })
        }

        //Check that there is a userID provided
        var userID = body.userID
        if(userID == 'undefined') {
            return res.status(404).json({
                err,
                message: 'You must provide a userID',
            })
        }

        //Check for userID in array of post's likes
        var postLikes = post.usersThatHaveLiked
        var found = postLikes.findIndex(function(element) {
            if(element == userID) {
                return true
            }
        })
        
        //If user has not already liked
        if(found == -1) {

            //Add userID to list of likes, and update like count
            post.usersThatHaveLiked.push(userID);
            post.likeCount = post.likeCount + 1;

            post
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        id: post._id,
                        message: 'Post liked!'
                    })
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'Error liking post...'
                    })
                })
        }
        else {
            return res.status(404).json({
                err,
                message: 'This user has already liked the post...',
            })
        }

    }).clone()

    //Add the post to the user's list of liked posts
    await User.findOne({_id: body.userID}, (err, user) => {
                                
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

        user.likedPosts.push(req.params.id)
        user
            .save()
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Error adding post to users likes....'
                })
            })
    }).clone()

    
}

unlikePost = async(req, res) => {
    const body = req.body;

    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a userID',
        })
    }

    //Update post like count and remove user from list of post's likes
    Post.findOne({_id: req.params.id }, (err, post) => {
        
        if(err) {
            return res.status(404).json({
                err,
                message: 'Post not found',
            })
        }

        //Check that there is a userID provided
        var userID = body.userID
        if(userID == 'undefined') {
            return res.status(404).json({
                err,
                message: 'You must provide a userID',
            })
        }

        //Check for userID in array of post's likes
        var postLikes = post.usersThatHaveLiked
        var found = postLikes.findIndex(function(element) {
            if(element == userID) {
                return true
            }
        })

        //Apply unlike if user found
        if(found != -1) {
            post.usersThatHaveLiked.splice(found, 1);
            post.likeCount = post.likeCount - 1;
            post
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        id: post._id,
                        message: 'Post unliked!'
                    })
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'Error unliking post...'
                    })
                })
        }
        else {
            return res.status(404).json({
                err,
                message: 'This user has not already liked the post...',
            })
        }

    }).clone()

    //Remove the post from the user's list of liked posts
    await User.findOne({_id: body.userID}, (err, user) => {
                                
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
        
        //Remove the post from the user's liked posts
        var postIndex = user.likedPosts.findIndex(function(element) {
            if(element == req.params.id) {
                return true
            }
        })
        if(postIndex != 1) {
            user.likedPosts.splice(postIndex, 1)
        }
        else {
            return res.status(404).json({
                error,
                message: 'Post not in user likes...'
            })
        }


        user
            .save()
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Error adding post to users likes....'
                })
            })
    }).clone()
}

module.exports = {
    createPost,
    getPostById,
    getPosts,
    deletePost,
    likePost,
    unlikePost
}