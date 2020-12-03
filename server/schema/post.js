const mongoose = require('mongoose');
const POST = 'posts'
const userModel = require('./users');

const postSchema = new mongoose.Schema({
    post_url: {
        type: String,
    },
    post_isImg: {
        type: Boolean
    },
    post_isVideo: {
        type: Boolean
    },
    post_shareCount: {
        type: Number,
        default: 0
    },
    post_likeCount: {
        type: Number,
        default: 0
    },
    user_id : {
        type : mongoose.Types.ObjectId, 
        ref : userModel.collectionName
    },
    post_timeStamp: Date
}, {
    collection: POST
});


const post = mongoose.model(POST, postSchema);

module.exports = {
    modal: post,
    collectionName: POST
}
