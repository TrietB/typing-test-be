const {AppError, sendResponse, catchAsync} = require('../helpers/utils')
const User = require('../models/User')
const {ObjectId} = require('mongodb')
const bcrypt = require('bcryptjs')

const userController = {}


userController.createUser = catchAsync(async (req,res,next)=>{
    let {name, email, password, username} = req.body  
    console.log(name)
    let user = await User.findOne({email:email})
    if(user) throw new AppError(400, 'User exist', 'Registration Error')

    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password,salt)

    user = await User.create({name, email, password, username})

    const accessToken = await user.generateToken()
    
    sendResponse(res,200,true,{user, accessToken}, null,{message:'User created successful'})
})


userController.getAllUsers = catchAsync(async (req,res,next)=> {
    let {filterQuery} = req.query 
    // const allowedFilter = Object.keys(filterQuery)
    // if(allowedFilter.length) throw new AppError(402, "Bad Request", "no")

    const users = await User.find({})
    sendResponse(res,200, true, {users}, null, {message:'get users succesful'})
})

userController.getUserById = catchAsync( async (req,res,next)=> {
    let {username} = req.params
    
    const user = await User.findOne({username})
    if(!user) throw new AppError(404, 'user does not exist', 'get user failed')

    console.log(username)

    sendResponse(res,200,true, {user: user}, null, {message: 'get user by id success'})
})



module.exports = userController
