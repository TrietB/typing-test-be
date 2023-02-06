const jwt = require('jsonwebtoken')
const { AppError } = require('../helpers/utils')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const authentication = {}

authentication.loginRequired = (req,res,next) => {
    try{
        const tokenString = req.headers.authorization
        console.log(tokenString)
        if(!tokenString) throw new AppError(401, "Login Required", "Authentication Error")        
    } catch(err){
        next(err)
    }
}

module.exports = authentication