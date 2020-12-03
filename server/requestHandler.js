exports.sendJSONResponse = async ({res , statusCode , status , data = [] , message = '' }) => {
    res.status(statusCode).send({data  , message , status })
}