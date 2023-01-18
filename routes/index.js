var express = require('express');
var router = express.Router();

//authApi

const authApi = require('./auth.api')
const userApi = require('./user.api')
router.use('/auth', authApi)

router.use('/users', userApi)



module.exports = router;
