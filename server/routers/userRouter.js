const express = require('express')
const userController = require('../controllers/userController')
const Router = express.Router();

Router
    .post('/get',userController.getUser);


module.exports = Router;