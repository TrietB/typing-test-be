const {AppError, sendResponse, catchAsync} = require('../helpers/utils')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const userController = {}


userController.createUser = catchAsync(async (req,res,next)=>{
    let {name, email, password, username} = req.body  
    console.log(name)
    let user = await User.findOne({email:email})
    if(user) throw new AppError('400', 'User exist', 'Registration Error')

    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password,salt)

    user = await User.create({name, email, password, username})
    
    sendResponse(res,200,true,{user}, null,{message:'User created successful'})
})



module.exports = userController
