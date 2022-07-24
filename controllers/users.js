const { response, request } = require('express');
const User   = require('../models/user');
const bcryptjs = require('bcryptjs');
const {CheckFields} = require('../middlewares/checks');



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



const userLogin= async ()=>{

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

const usersDelete = async (req, res = response) => {
    const { id } = req.params;
    // truely delete const user = await User.findByIdAndDelete(id);
    let msg = '';
    if((req.user.role ) === 'ADMIN_ROLE'){
    //    console.log(`user: ${req.uid} trying to delete something`)
        const user = await User.findByIdAndUpdate(id,{state:false});
        msg = `the ${user} was deleted bt user: ${req.user.name}`
    }
    else{
        msg = `User: ${req.user.name}  can't delete user: ${id}. He is not admin `
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