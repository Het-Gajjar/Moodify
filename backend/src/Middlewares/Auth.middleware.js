const jwt=require('jsonwebtoken')
const Redis=require('../config/cache');
const redis = require('../config/cache');
async function IdetifyUser(req,res,next) {

  const token = req.cookies?.token;
console.log(token)

    if(!token)
    {
        return res.status(400).json({
             message:"token is not found"
        })
    }
    const isblacklisted=await redis.get(token)
    
    if(isblacklisted)
    {
        return res.status(400).json({
            message:"Ivalid token"
        }
        )
    }

      try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
         req.user=decoded
         next()
      }
      catch(err){
       return res.status(401).json({
          message:"unaurthorised access"
        })
      }
   
    

   
}

module.exports=IdetifyUser