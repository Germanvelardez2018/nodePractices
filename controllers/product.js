const { response, request } = require('express');
const {Product,User, Category} = require("../models");
const category = require('../models/category');
const ObjectId = require('mongodb').ObjectId;



// Get Product by id (from params)
const getProductById = async (req,res=response)=>{
    const {id}= req.params;
    let product;
    try {
         product = await Product.findById(id).populate('createdBy','name').populate('category','name');
    } 
    catch (error) {     
        product ={ msg:`the Product:${id} doesn't exists`}
    }
    return res.status(200).json({  
        product
    }); 
    }
   

// Get Products- indicates pages. Populate
const getListProducts = async(req, res=response)=>{
    const {lim=20 ,from=0,amountByPage=5} = req.query;
    let total,list;
    try {
          [total,list]  =  await Promise.all([
          Product.countDocuments({state: true}),
          Product.find().populate('createdBy','name').populate('category','name').limit(lim).skip(from),
        ]);
    } catch (error) {
        [total,list]=[0,['nothing to show']]   
    }
    return res.json({
        msg: 'get list Products',
        total,
        list
    });
}


// Create a new Product. You need a token valid
const createProduct = async (req,res=response)=>{
    const name = req.body.name.toUpperCase();
    const category = req.body.category.toUpperCase();
    const price = Number(req.body.price) || 0;
    const description = req.body.description || "Not description";
    const productDb = await Product.findOne({name});
    if(productDb){
        return res.status(400).json({
            msg: `the product:"${name}" already exists`
        });
    }  
    let newProduct; 
    try {
        newProduct = await new Product({
            name,
            createdBy:req.user._id,
            price,
            description,
            category
        });
        await newProduct.save();
        return res.status(200).json({
            msg: `the Product:"${name}" was created`
        });
    } catch (error) {
        return res.status(400).json({
            msg: `the Product:"${name}" was't created. Error ${error}`
        });
    } 
}


//Update a Product. data from params.
const putProduct = async (req, res = response) => {
    const { id } = req.params;
    const {state,description,name,category,...restBody} = req.body;
    let obj = {};
    if (name) {
       Object.assign(obj,{name:name.toUpperCase()});
    }
    if(description){
        Object.assign(obj,{description});
    }
    if(category){
        Object.assign(obj,{category: category.toUpperCase()});
    }
    // Validate if the id exit
    const product = await Product.findByIdAndUpdate(id,obj,{new: true});
    res.json({
        msg: 'Update data',
        updateData:obj,
        id,
        product
    });
}


//Delete a Product
const deleteProduct = async (req,res=response)=> {
    const { id } = req.params;    
    let msg = '';
    try {
        const product = await Product.findByIdAndUpdate(id,{state:false},{new: true});
        msg = `Product:${product.name} was deleted `;
    } catch (error) {
        msg = `err ${error} `   
    }
    res.json({
        msg
    })
}


module.exports = {
    createProduct,
    getListProducts,
    getProductById,
    putProduct,
    deleteProduct
}