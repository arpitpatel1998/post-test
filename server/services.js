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


exports.savePost = async (req,res) => {
    req.body.post_timeStamp = new Date();
    req.body.user_id = ObjectId(req.body.user_id);
    const save = new postModel.modal(req.body);
    await save.save();
}

exports.saveUser = async (req,res) => {
    req.body.createdAt = new Date();
    req.body.updatedAt = new Date();
    const save = new userModel.modal(req.body);
    console.log(await save.save());
}

exports.saveComment = async (req,res) => {
    req.body.user_id = ObjectId(req.body.user_id);
    req.body.post_id = ObjectId(req.body.post_id);
   
    req.body.comment_timeStamp = new Date();
    const save = new commentModel.modal(req.body);
    console.log(await save.save());
}


