const User = require('../models/user-model');
const Post = require('../models/post-model');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Add parent comments at a later date
const Comment = new Schema(
    {
        postID: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
        username: { type: String, required: true },
        userID: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        content: {type: String, required: true },
    },
    { timestamps: true }, 
)

module.exports = mongoose.model('comments', Comment)