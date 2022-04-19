const User = require('../models/user-model');
const Post = require('../models/post-model')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide user info',
        })
    }

    //Modify if model changes
    const user = new User({
        username: body.username,
        password: body.password,
        biography: body.biography,
        isAdmin: body.isAdmin,
        likedPosts: body.likedPosts,
        comments: body.comments
    }); 

    if (!user) {
        console.log("400 error")
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}
/*
updateUser = async(req, res) => {
    const body = req.body;

    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must specify the user to update',
        })
    }

    User.findOne({_id: req.params.id }, (err, user) => {
        if(err) {
            return res.status(404).json({
                err,
                message: 'User not found',
            })
        }

        //Modify if model changes
        user.username = body.username;
        user.password = body.password;
        user.biography = body.biography;
        user.isAdmin = body.isAdmin;
        user.likedPosts = body.likedPosts;
        user.comments = body.comments;

        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated...'
                })
            })
    })
}*/

updateUser = async(req, res) => {
    await User.findOneAndUpdate({_id: req.params.id}, {$set: {biography: req.body.biography}}, {new: true}, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({  
            success: true,
            data: user
        })
    })
        .clone()
        .catch(err => console.log(err))
}

changeAdmin = async(req, res) => {
    await User.findOneAndUpdate({_id: req.params.id}, {$set: {isAdmin: req.body.isAdmin}}, {new: true}, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({  
            success: true,
            data: user
        })
    })
        .clone()
        .catch(err => console.log(err))
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    })
        .clone()
        .catch(err => console.log(err))

}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: users })
    })
        .clone()
        .catch(err => console.log(err))
}

getUserStats = async (req, res) => {
    await User.find({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!user.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        console.log(user[0].posts.length)

        var userStats = {
            "numberOfPosts": user[0].posts.length,
            "numberOfComments": user[0].comments.length,
            "numberOfLikes": user[0].likedPosts.length
        }

        return res.status(200).json({ success: true, data: userStats })
    })
        .clone()
        .catch(err => console.log(err))
}


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsers,
    getUserStats,
    changeAdmin
}