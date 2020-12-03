const mongoose = require('mongoose');
const COMMENT = 'comments'
const userModel = require('./users');
const postModel = require('./post');

const commentSchema = new mongoose.Schema({
    comment_description: {
        type: String,
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: userModel.collectionName
    },
    post_id: {
        type: mongoose.Types.ObjectId,
        ref: postModel.collectionName
    },
    comments : {
        type : mongoose.Types.ObjectId,
        ref : COMMENT
    },
    comment_timeStamp: Date
}, {
    collection: COMMENT
});


const comment = mongoose.model(COMMENT, commentSchema);

module.exports = {
    modal: comment,
    collectionName: COMMENT
}
