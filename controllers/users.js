const { response, request } = require('express');
const User   = require('../models/user');

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

    const body = req.body;

    const user = new User(body);
    try {
        await user.save();
        console.log(user);
    } catch (error) {
        console.log(error)
    }
   

    res.json({
        msg: 'post API - usersPost',
       user
       
       
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