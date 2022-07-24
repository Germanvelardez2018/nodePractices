const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId; 
const jwt = require('jsonwebtoken');
const {Response,Resquest} = require('express');

const isRole = (...roles)=>{


    return (req,res,next)=>{
        if(! req.user){
            res.status(500).json({
                msg: 'invalid uid in JWT'
            })
         }
        const {role, name} = req.user
        
         if(!roles.includes(role)){
            return res.status(400).json({err:` the user: ${name} isn't a correct role`}) 
         }
         next();
    }
  
}



module.exports= {
    isRole
}