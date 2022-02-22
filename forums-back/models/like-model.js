const User = require('../models/user-model');
const Post = require('../models/post-model');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Like = new Schema(
    {
        username: {type: User, required: true },
        post: {type: Post, required: true },
    }
)