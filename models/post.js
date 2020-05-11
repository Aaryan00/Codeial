const mongoose = require('mongoose');

cost postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.Objectid,
        ref: 'User'
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;