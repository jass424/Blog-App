const mongoose = require('mongoose');
const User = require('./usermodel'); // Assuming user model is in the same directory
const Blog = require('./blog.model'); // Assuming blog model is in the same directory

const commentSchema = new mongoose.Schema({
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reaquired: true
    },
    commentText: {
        type: String,
        required: true
    },

},{timestamps: true});

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;