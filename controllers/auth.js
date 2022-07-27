
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
    let user ;
    try {
        const data = await googleVerify(id_token);
        const {email,name,img}= data;
        user = await User.findOne({ email});
        if(!user){
        // if email doesn't exist in db
         const newUser ={
              name,
              email,
              password:'Boca Jr moriste en Madrid',
              img,
              google: true
          }
          user = new User(newUser);
          await user.save();   
        }

        if(!user.state){
            return res.status(401).json({
                msg: 'User blocked, please contact to the administrator'
            });
        }
    } catch (error) {
        res.status(400).json({
            msg:'google token error'
        })
    }

    // Generate the JWT

    const jwt = await getJwt(user.id);

    res.json({
        msg:'Everthing is ok',
        id_token,
        user,
        jwt
    });

}





module.exports = {
    login,
    googleSignIn
};