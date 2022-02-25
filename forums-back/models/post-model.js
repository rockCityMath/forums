const User = require('../models/user-model');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        userID: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        content: {type: String, required: true },
        tags: {type: [String], required: true }
    }
)
module.exports = mongoose.model('posts', Post)