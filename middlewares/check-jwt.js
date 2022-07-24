const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId; 
const User = require('../models/user')

const {Response,Request} = require('express');

const validateJWT =  async(req,res=Response,next)=>{
    //jwt is in headers
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({msg: 'There is not token, please login again'});      
    }
    try {
        console.log('estamos aqui')
        const {uid} = jwt.verify(token,process.env.SECRECTKEY);
        console.log(`user id:${uid}`);
        const userLogin = await User.findOne({_id:ObjectId(uid),
            status: true });
    
            if(userLogin){
                req.user = userLogin;
            }

       
        next();
        
    } catch (error) {

        return res.status(401).json({msg: 'Token invalid'})    
        
    }
  
}


module.exports={
    validateJWT
}