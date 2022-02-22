const User = require('../models/user-model');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        username: {type: User, required: true },
        content: {type: String, required: true },
        tag: {type: [String], required: true }
    }
)