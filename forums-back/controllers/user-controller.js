const User = require('../models/user-model');

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide user info',
        })
    }

    const user = new User({
        name: body.name,
        email: body.email
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

module.exports = {
    createUser,
}