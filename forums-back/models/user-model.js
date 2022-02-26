const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        username: { type: String, required: true },
        password: {type: String, required: true },
        biography: {type: String, required: true }, 
        isAdmin: {type: Boolean, required: true, default: false },
        likedPosts: {type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'Post'},  //Arr of objID that references a post
        comments: {type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'Comment'}  //same
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)