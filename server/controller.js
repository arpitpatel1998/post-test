const responseHelper = require('./requestHandler');
const resource = require('./resource');
const { post } = require('./router');
const {
    userListService,
    postDetailsService,
    homeScreenDataService
} = require('./services');
exports.userList = async (req,res) => {
    try{
        const list = await userListService();
        return responseHelper.sendJSONResponse(
            {res , statusCode : 200 , message : resource.USER_LIST , status : 'success' , data : list});
    }catch(err)
    {
        return responseHelper.sendJSONResponse({res , statusCode : 500 , message : err.message , status : 'error'});
    }
}

exports.postDetails = async (req,res) => {
    try{
        const {postId} = req.params;
        const details = await postDetailsService(postId);
        if(details)
        {
            return responseHelper.sendJSONResponse(
                {res , statusCode : 200 , message : resource.POST_DETAILS , status : 'success' , data : details});
      
        }else{
            return responseHelper.sendJSONResponse(
                {res , statusCode : 404 , message : resource.POST_DETAILS_NOT_FOUND , status : 'error' , data : {}});
                
        }
    }catch(err)
    {
        return responseHelper.sendJSONResponse({res , statusCode : 500 , message : err.message , status : 'error'});
    }
}

exports.homeScreenData = async (req,res) => {
    try{
        const postList = await homeScreenDataService();
        return responseHelper.sendJSONResponse(
            {res , statusCode : 200 , message : resource.HOME_SCREEN_DATA , status : 'success' , data : postList});
    }catch(err)
    {
        return responseHelper.sendJSONResponse({res , statusCode : 500 , message : err.message , status : 'error'});
    }
}
