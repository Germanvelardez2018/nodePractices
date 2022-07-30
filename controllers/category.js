const { response, request } = require('express');
const {Category,User} = require("../models");
const ObjectId = require('mongodb').ObjectId;



// Get Category by id (from params)
const getCategoryById = async (req,res=response)=>{
    const {id}= req.params;
    let category;
    try {
         category = await Category.findById( id).populate('createdBy','name');
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
          Category.find().populate('createdBy','name').limit(lim).skip(from),
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


// Create a new category. You need a token valid
const createCategory = async (req,res=response)=>{
    const name = req.body.name.toUpperCase();
    const categoryDb = await Category.findOne({name}).populate('createdBy');
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


//Update a category. data from paras.
const putCategory = async (req, res = response) => {

    const { id } = req.params;
    const {state,user,name,...restBody} = req.body;
    let obj = {};
    
    if (name) {
       Object.assign(obj,{name:name.toUpperCase()});
    }
    if (user) {
       Object.assign(obj,{createdBy:user});
    }

    // Validate if the id exit
    const category = await Category.findByIdAndUpdate(id,obj,{new: true});
    res.json({
        msg: 'Update data',
        obj,
        id,
        category
    });
}


//Delete a category
const deleteCategory = async (req,res=response)=> {
    const { id } = req.params;    
    let msg = '';
    try {
        const category = await Category.findByIdAndUpdate(id,{state:false},{new: true});
        msg = `Category:${category.name} was deleted `;
    } catch (error) {
        msg = `err ${error} `   
    }
    res.json({
        msg
    })
}


module.exports = {
    createCategory,
    getListCategories,
    getCategoryById,
    putCategory,
    deleteCategory
}