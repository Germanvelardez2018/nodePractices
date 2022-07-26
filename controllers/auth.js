
const {Request, Response} = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const { getJwt } = require('../utils/gen-jwt');
const { googleVerify } = require('../utils/google-verify');

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
            user: user,
            jwt
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error in backend'
        })
       
    }
   
}


const googleSignIn = async (req = Request,res = Response)=>{

    const {id_token} = req.body;
    try {
        const googleUser = await  googleVerify(id_token);
    } catch (error) {
        res.status(400).json({
            msg:'google token error'
        })
    }

    res.json({
        msg:'Everthing is ok',
        id_token
    });

}





module.exports = {
    login,
    googleSignIn
};