const Post = require('../models/post-model');
const User = require('../models/user-model');
const { post } = require('../routes/comment-router');

createPost = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide post info',
        })
    }

    const post = new Post({
        userID : body.userID,
        title: body.title,
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
    
    //Add the post to the user's list of posts
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

        user.posts.push(post._id)
        user
            .save()
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Error adding post to users likes....'
                })
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
    var userID = 0

    await Post.findOneAndDelete({ _id: req.params.id }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!post) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }
        userID = post.userID

        return res.status(200).json({ success: true })
    })
        .clone()
        .catch(err => console.log(err))

    //Check for valid userID and remove the post from the users list of posts
    if(userID == 0) {
        return res
                .status(404)
                .json({ success: false, error: `Unable to remove from users posts list` })
    }
    else {
        await User.findOne({_id: userID}, (err, user) => {
                                    
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
            
            //Remove the post from the user's posts
            var postIndex = user.likedPosts.findIndex(function(element) {
                if(element == post.userID) {
                    return true
                }
            })
            if(postIndex != 1) {
                user.posts.splice(postIndex, 1)
            }
            else {
                return res.status(404).json({
                    error,
                    message: 'Post does not belong to user...'
                })
            }

            user
                .save()
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'Error removing post from user...'
                    })
                })
        })
            .clone()
            .catch(err => console.log(err))
        }
}

//Get the n most liked posts in order from greatest to least
//How to do this without having to fetch every single object and sort them
getMostLikedPosts = async (req, res) => {
    await Post.find({}, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!posts.length) {
            return res
                .status(404)
                .json({ success: false, error: `Posts not found` })
        }
        return res.status(200).json({ 
            success: true, 
            data: posts
                .sort((a, b) => (a.likeCount < b.likeCount) ? 1 : -1)
                .slice(0, 3) //second parameter is amount of posts to return
        })
    })
        .catch(err => console.log(err))
}

//Get the n most recent posts in order from newest to oldest
getMostRecentPosts = async (req, res) => {
    await Post.find({}, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!posts.length) {
            return res
                .status(404)
                .json({ success: false, error: `Posts not found` })
        }
        return res.status(200).json({ 
            success: true, 
            data: posts
                .sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
                .slice(0, 3) //second parameter is amount of posts to return
        })
    })
        .catch(err => console.log(err))
}



module.exports = {
    createPost,
    getPostById,
    getPosts,
    deletePost,
    getMostLikedPosts,
    getMostRecentPosts
}