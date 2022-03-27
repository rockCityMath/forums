const bcrypt = require('bcryptjs')
const nJwt = require('njwt')
const config = require('../config')

const { idFromToken } = require('../auth')
const { jwtAuth } = require('../auth')

const User = require('../models/user-model')


registerUser = async(req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide user info',
        })
    }

    var hashedPassword = bcrypt.hashSync(body.password, 8)

    const user = new User({
        username: body.username,
        password: hashedPassword,
        // biography: body.biography,
        // isAdmin: body.isAdmin,
        // likedPosts: body.likedPosts,
        // comments: body.comments
    }); 

    if (!user) {
        console.log("400 error")
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            console.log(new Date() + " ---- Registered User: " + user.username)
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

loginUser = async(req, res) => {
    await User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(200).send({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(200)
                .send({ success: false, error: `User not found` })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(200).send({ auth: false, token: null });
        }

        var jwt = nJwt.create({id: user._id}, config.secret)
        jwt.setExpiration(new Date().getTime() + ( 24*60*60*1000*1000 ));


        console.log(new Date() + " ---- Login User: " + req.body.username)
        res.status(200).send({ auth: true, token: jwt.compact() });

    })
        .clone()
        .catch(err => console.log(err))
}

getUserID = async(req, res) => {
    jwtAuth(req, res, 

    )
}

getUsernameFromID = async(req, res) => {
    await idFromToken(req.headers['authorization'].split(" ").pop(), (decodedID) => {
        userID = decodedID
    })

    if(userID == undefined || userID == 0 ) {
        return res.status(404).json({
            message: 'You must be logged in!'
        })
    }

    //Get username from userID
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

    return res.status(201).json({
        message: userFromID.username,
        admin: userFromID.isAdmin
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserID,
    getUsernameFromID
}