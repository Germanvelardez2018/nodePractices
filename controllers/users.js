const { response, request } = require('express');
const {User}   = require('../models/index');
const bcryptjs = require('bcryptjs');


const getUser = async (req = request, res = response)=>{
    let obj = {};
    const {name,email} = req.query;
    if (name) {
       Object.assign(obj,{name});
    }
    if (email) {
       Object.assign(obj,{email});
    }
    console.log(`searching obj:`);
    console.log(obj)
    let user = await User.find(obj);
    console.log(user);
    res.json({
        msg: 'get user:',
        user
    });
    
}


const listUsersGet = async (req = request, res = response) => {
    const {lim=20 ,from=0,amountByPage=5} = req.query;
    // I have two promises that they can be work at the time
    let total,list;
    try {
           [total,list]  =  await Promise.all([
            User.countDocuments({state: true}),
            User.find({state : true}).limit(lim).skip(from),
        ]);
    } catch (error) {
        [total,list]=[0.['nothing to show']]   
    }
    res.json({
        msg: 'get list users',
        total,
        list
    });
}


// Ser params from json

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


// Set params from json

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
        msg:  `data update`,
        restBody,
        id,
        user,
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usersPatch'
    });
}

const usersDelete = async (req, res = response) => {
    const { id } = req.params;    
    let msg = '';
    try {
        const user = await User.findByIdAndUpdate(id,{state:false});
        msg = `the ${user} was deleted bt user: ${req.user.name}`;
    } catch (error) {
        msg = `err ${error} `   ;
    }
    res.json({
        msg
    })
}




module.exports = {
    listUsersGet,
    getUser,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}