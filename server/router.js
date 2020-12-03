const express = require('express');
const router = express.Router();
const {
    userList , 
    postDetails, 
    homeScreenData
} = require('./controller');

const {
    savePost , saveUser , saveComment
} = require('./services');
router.get('/user-list',userList);
router.get('/post-details/:postId',postDetails);
router.get('/',homeScreenData);

router.post('/user',saveUser);
router.post('/post',savePost);
router.post('/comment',saveComment);

module.exports = router;