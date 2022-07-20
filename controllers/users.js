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
        user:user.toJSON()    
    });
}

const usersPut = async (req, res = response) => {
    const { id } = req.params;

    const {password,google,email,...restBody} = req.body;

    // Validate if the id exits

    if(password){
      const salt = bcryptjs.genSaltSync();
      restBody.password = bcryptjs.hashSync(password,salt);
    }
    const user = await User.findByIdAndUpdate(id,restBody);
    res.json({
        msg: 'put API - usersPut',
        id,
        user
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