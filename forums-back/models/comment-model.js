const User = require('../models/user-model');
const Post = require('../models/post-model');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Will parentComment work???
const Comment = new Schema(
    {
        post: {type: Post, required: true },
        parentComment: {type: Comment, required: false },
        username: {type: User, required: true },
        content: {type: String, required: true },
    }
)