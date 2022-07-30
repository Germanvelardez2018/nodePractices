const {Response} = require('express');
const { collection } = require('../models/user');


const SearchSomething = (req,res = Response)=>{

    const {collection,items} = req.params;
    res.json({
        msg: `Search... ${items} into ${collection}`
    })
}





module.exports = {
    SearchSomething
}