const bcrypt = require('bcryptjs')
const nJwt = require('njwt')
const config = require('../config')

const User = require('../models/user-model')

const jwtAuth = require('../auth')

registerUser = async(req, res) => {
    console.log("recieved request")

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide user info',
        })
    }

    var hashedPassword = bcrypt.hashSync(body.password, 8)

    //Modify if model changes
    const user = new User({
        username: body.username,
        password: hashedPassword,
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

loginUser = async(req, res) => {

    await User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({ auth: false, token: null });
        }

        var jwt = nJwt.create({id: user._id}, config.secret)
        jwt.setExpiration(new Date().getTime() + (24*60*60*1000));

        res.status(200).send({ auth: true, token: jwt.compact() });

    }).catch(err => console.log(err))
}

getUserID = async(req, res) => {

    jwtAuth(req, res, 
        console.log("next!")
    )

}

module.exports = {
    registerUser,
    loginUser,
    getUserID
}