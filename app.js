var express = require('express');
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const userRouter = require('./routes/user.api')
const authRouter = require('./routes/auth.api')
const { sendResponse } = require('./helpers/utils');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/users',userRouter)
app.use('/auth', authRouter)


const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI).then(()=> console.log(`Connected to DB ${mongoURI}`)).catch((err)=> console.log(err))

//handle error

//catch error
app.use((req,res,next)=> {
    const err = new Error("Not Found")
    err.statusCode = 404
    next(err)
})

app.use((err,req,res,next)=> {
    console.log("ERROR", err)

    if(err.isOperational){
        return sendResponse(res, err.statusCode ? err.statusCode : 500, false, null, {message: err.message}, err.errorType)
    } else {
        return sendResponse(res, err.statusCode ? err.statusCode : 500, false, null, {message: err.message}, 'Internal Server Error')
    }
})




module.exports = app;
