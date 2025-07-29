const mongoose = require('mongoose');
const User = require('./usermodel'); // Assuming user model is in the same directory

const blogSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    blogThumbnail: {
        type: String,
        required: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
     type: String,
     enum: ['pending', 'approved', 'rejected'],
     default: 'pending'
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);


module.exports = Blog;