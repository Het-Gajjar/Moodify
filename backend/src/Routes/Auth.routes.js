const express=require('express');
const userModel = require('../models/user.model');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const AuthRouter=express.Router();
const AuthController=require('../controller/AuthController');
const IdetifyUser = require('../Middlewares/Auth.middleware');


AuthRouter.post('/register',AuthController.register)
AuthRouter.post('/login',AuthController.login)
AuthRouter.post('/logout',IdetifyUser,AuthController.logout);
AuthRouter.get('/getme',IdetifyUser,AuthController.getme)


module.exports=AuthRouter

