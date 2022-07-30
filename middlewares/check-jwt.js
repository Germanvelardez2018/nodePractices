const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId; 
const User = require('../models/user')
const {Response,Request} = require('express');



const validateJWT =  async(req,res=Response,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({msg: 'There is not token, please login again'});      
    }
    try {
        const {uid} = jwt.verify(token,process.env.SECRETKEY);
        const userLogin = await User.findOne({_id:ObjectId(uid),
        status: true });
       if(userLogin){
           req.user = userLogin;
       }
       else{
           res.status(200).json({msg: "user invalid"});
       }
        next();
    } catch (error) {
        return res.status(401).json({msg: 'Token invalid'})     
    }
}


module.exports={
    validateJWT
}