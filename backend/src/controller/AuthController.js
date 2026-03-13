const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const userModel=require('../models/user.model');
const redis = require('../config/cache');

 async function register(req,res){

    const {username,email,password}=req.body;

    const isUserAlreadyExits=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExits)
    {
        return res.status(400).json({
            message:"user already exits"
        })
    }

    const hash= await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        password:hash
    })

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1h"})

    res.cookie("token",token)

    res.status(201).json({
        message:"user register succesufully",
        username:user.username,
        email:user.email
    })

}
async function login(req,res){

    const {username,email,password}=req.body;

    const user=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select('+password')
    if(!user)
    {
        return res.status(401).json({
            message:"unAuthroized access"
        })
    }

    const match= await bcrypt.compare(password,user.password);
    if(!match)
    {
        return res.status(400).json({
            message:"invalid credecial"
        })
    }
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1h"})

    res.cookie("token",token);

    res.status(200).json({
        message:"login sucessfully"
    })
}
async function logout(req,res) {
    const token=req.cookies.token

    res.clearCookie("token")

     await redis.set(token,Date.now().toString())

     res.status(200).json({
        message:"logout successfully"
     })
}
async function getme(req,res) {

    const user=await userModel.findById(req.user.id);

    if(!user)
    {
        return res.status(400).json({
            message:"Invalid "
        })
    }

     res.status(200).json({
        message:"user found",
        user
    })
    
}
module.exports={login,register,logout,getme}