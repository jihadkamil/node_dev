module.exports={
    sendResponse:(res, statusCode, data)=>{
        let response={}
        response.message = data
        response.code = statusCode
        res.send(statusCode, response)
    }
}