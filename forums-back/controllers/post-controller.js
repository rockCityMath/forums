
const { idFromToken } = require('../auth');

const Post = require('../models/post-model');
const User = require('../models/user-model');
const { post } = require('../routes/comment-router');

createPost = async (req, res) => {
    const body = req.body
    var userID

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide post info',
        })
    }

    //Get users ID from JWT on header 
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
    })  
        .clone()
        .exec()
        .catch(err => console.log(err))

    //Seperate tags
    var parsedTags = body.tags.split(' ')

    //Create post object  with given information (id and username obtained previously)
    const post = new Post({
        userID : userID,
        username: userFromID.username,
        title: body.title,
        content : body.content,
        tags : parsedTags,
    }); 

    if (!post) {
        console.log("400 error")
        return res.status(400).json({ success: false, error: err })
    }

    post
        .save()
        .then(() => {
            
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Post not created!',
            })
        })

    //Add the post to the user's list of posts
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

        user.posts.push(post._id)
        user
            .save()
            .then(() => {
                console.log(new Date() + " ---- Post Created: " + post._id)
                return res.status(201).json({
                    success: true,
                    id: post._id,
                    message: 'Post created!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Error adding post to users posts....'
                })
            })
    })
        .clone()
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
    })
        .clone()
        .catch(err => console.log(err))
}

deletePost = async (req, res) => {
    var userID = 0

    //Get users ID from JWT on header 
    await idFromToken(req.headers['authorization'].split(" ").pop(), (decodedID) => {
        userID = decodedID
    })

    if(userID == undefined || userID == 0 ) {
        return res.status(404).json({
            message: 'You must be logged in!'
        })
    }

    await Post.findOneAndDelete({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

    })
        .clone()
        .catch(err => console.log(err))

    //Remove post from user's list
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
        var postIndex = user.posts.findIndex(function(element) {
            if(element == req.params.id) {
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
            .then(() => {
                console.log(new Date() + " ---- Post Removed: ")
                return res.status(200).json({ success: true })
            })
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
                .slice(0, 5) //second parameter is amount of posts to return
        })
    })
        .clone()
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
                .slice(0, 20) //second parameter is amount of posts to return
        })
    })
        .clone()
        .catch(err => console.log(err))
    
}

getUsersPosts = async (req, res) => {
    await Post.find({ userID: req.params.id }, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!posts.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users posts not found` })
        }
        return res.status(200).json({ 
            success: true, 
            data: posts
                .sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
        })
    })
    .clone()
    .catch(err => console.log(err))
}


module.exports = {
    createPost,
    getPostById,
    deletePost,
    getMostLikedPosts,
    getMostRecentPosts,
    getUsersPosts
}