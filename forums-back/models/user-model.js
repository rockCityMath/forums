
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        username: { type: String, required: true },
        password: {type: String, required: true },
        biography: {type: String, required: false },
        isAdmin: {type: Boolean, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)