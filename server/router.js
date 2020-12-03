const express = require('express');
const router = express.Router();
const {
    userList , 
    postDetails, 
    homeScreenData
} = require('./controller');


router.get('/user-list',userList);
router.get('/post-details/:postId',postDetails);
router.get('/',homeScreenData);


module.exports = router;