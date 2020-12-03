const { ObjectId } = require('mongoose').Types;
const userModel = require('./schema/users');
const postModel = require('./schema/post');
const commentModel = require('./schema/comments');


exports.userListService = async () => {
    const userList = await userModel.modal.find().sort({updatedAt : -1});
    return userList;
}

exports.postDetailsService = async (postId) => {
    const details = await postModel.modal.aggregate([
        {
          '$match': {
            '_id': ObjectId(postId)
          }
        }, {
          '$lookup': {
            'from': 'users', 
            'localField': 'user_id', 
            'foreignField': '_id', 
            'as': 'user_data'
          }
        }, {
          '$unwind': {
            'path': '$user_data'
          }
        }, {
          '$lookup': {
            'from': 'comments', 
            'localField': '_id', 
            'foreignField': 'post_id', 
            'as': 'comment'
          }
        }, {
          '$project': {
            'post_id': '$_id', 
            'post_rol': '$post_url', 
            'post_isImg': 1, 
            'post_isVideo': 1, 
            'post_shareCount': 1, 
            'post_likeCount': 1, 
            'post_timeStamp': 1, 
            'user_name': '$user_data.user_name', 
            'user_fullName': '$user_data.user_fullName', 
            'user_img': '$user_data.user_img', 
            'comment': 1
          }
        }, {
          '$sort': {
            'post_timeStamp': -1
          }
        }
      ]);
    const [data] = details; 
    return data;
}

exports.homeScreenDataService = async () => {
    const details = await postModel.modal.aggregate([
        {
          '$lookup': {
            'from': 'users', 
            'localField': 'user_id', 
            'foreignField': '_id', 
            'as': 'user_data'
          }
        }, {
          '$unwind': {
            'path': '$user_data'
          }
        }, {
          '$lookup': {
            'from': 'comments', 
            'localField': '_id', 
            'foreignField': 'post_id', 
            'as': 'comment'
          }
        }, {
          '$project': {
            'post_id': '$_id', 
            'post_rol': '$post_url', 
            'post_isImg': 1, 
            'post_isVideo': 1, 
            'post_shareCount': 1, 
            'post_likeCount': 1, 
            'post_timeStamp': 1, 
            'user_name': '$user_data.user_name', 
            'user_fullName': '$user_data.user_fullName', 
            'user_img': '$user_data.user_img', 
            'comment': 1
          }
        }, {
          '$sort': {
            'post_timeStamp': -1
          }
        }
      ]);
      console.log('details',details);
    return details;
}




