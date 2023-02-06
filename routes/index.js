const express = require('express');
const router = express.Router();

//authApi



router.get('/', function(req, res, next) {
    res.status(200).send("Welcome to taskmanager")
  });




module.exports = router;
