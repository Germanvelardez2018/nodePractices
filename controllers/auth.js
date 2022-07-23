
const {Request, Response} = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const { getJwt } = require('../utils/gen-jwt');

const login = async (req = Request,res = Response)=>{

    const {email, password}  = req.body;
    try {


        // Check if the email exist
        const user = await User.findOne({email,state: true});
        if(!user){
            return res.status(400).json({
                msg: "User/Password are wrong"
            });
        }

       
        //Check if the user is actived
       
        //Check the password
        const validPassword = bcryptjs. compareSync(password,user.password);// pass without crypt/ pass with crypt
        if(!validPassword){
            return res.status(400).json({
                msg: "User/Password are wrong"
            });
        }

        //Generate the JWT

        const jwt = await getJwt(user.id);

        res.json({
            msg: 'login ok',
            user: user.name,
            jwt
           
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error in backend'
        })
       
    }
   
   
   
   
   

}





module.exports = {
    login
};