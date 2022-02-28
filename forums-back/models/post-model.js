const User = require('../models/user-model')
const Comment = require('../models/comment-model')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        userID: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        title: {type: String, required: true },
        content: {type: String, required: true },
        tags: {type: [String], required: true },
        usersThatHaveLiked: {type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'User'},
        likeCount: { type: Number, required: true, default: 0 },
        comments: {type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'Comment'}   
    },
    { timestamps: true } 
)
module.exports = mongoose.model('posts', Post)