const { response, request } = require('express');
const {User}   = require('../models/index');

const {Category} = require("../models");
const ObjectId = require('mongodb').ObjectId;




const getCategoryById = async (req,res=response)=>{
    const {id}= req.params;
    let category;
    try {
         category = await Category.findById( id).populate('createdBy');
    } 
    catch (error) {     
        category ={ msg:`the category:${id} doesn't exists`}
    }
    return res.status(200).json({  
        category
    }); 
    }
   



// Get Categorias- indicates pages. Populate
const getListCategories = async(req, res=response)=>{
    const {lim=20 ,from=0,amountByPage=5} = req.query;
    let total,list;
    try {
          [total,list]  =  await Promise.all([
          Category.countDocuments({state: true}),
          Category.find().populate('createdBy').limit(lim).skip(from),
        ]);
    } catch (error) {
        [total,list]=[0.['nothing to show']]   
    }
    return res.json({
        msg: 'get list Categories',
        total,
        list
    });
}




const createCategory = async (req,res=response)=>{
    const name = req.body.name.toUpperCase();
    const categoryDb = await Category.findOne({name}).populated('createdBy');
    if(categoryDb){
        return res.status(400).json({
            msg: `the category:"${name}" already exists`
        });
    }   
    try {
        newCategory = await new Category({
            name,
            createdBy:req.user._id,
        });
        await newCategory.save();
        return res.status(200).json({
            msg: `the category:"${name}" was created`
        });
    } catch (error) {
        return res.status(400).json({
            msg: `the category:"${name}" was't created. Error ${error}`
        });
    }
 
}





module.exports = {
    createCategory,
    getListCategories,
    getCategoryById
}