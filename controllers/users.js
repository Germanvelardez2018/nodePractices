const { response, request } = require('express');
const User   = require('../models/user');
const bcryptjs = require('bcryptjs');
const {CheckFields} = require('../middlewares/checks');



const usersGet = (req = request, res = response) => {
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}

const usersPost = async  (req, res = response) => {



    const{name, email, password, role}= req.body;

    const user = new User({name, email, password, role});

    // Check if the email already exists

    const alreadyeMail = await  User.findOne({email});
    if(alreadyeMail) 
        {
            return res.status(400).json({error:' this email already exists'})
        } 

      //check is the email format is valid  

    // Encrypt the pass

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);
    //Save in DB 


    try {
        await user.save();
        console.log(user);
    } catch (error) {
        console.log(error)
    }
   

    res.json({
        msg: 'User created successfully',
       user:{
            name:user.name,
            email:user.email
       }
       
       
    });
}

const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usersPut',
        id
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usersPatch'
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usersDelete'
    });
}




module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}