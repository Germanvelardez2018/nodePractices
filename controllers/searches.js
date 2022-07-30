const {Response} = require('express');
const {User,Category, Product} = require('../models');
const {ObjectId} = require('mongoose').Types;


const collectionAvailable = {
    users: User,
    categories: Category,
    products: Product
};


const searchByNameOrUid = async(item,Collection)=>{
    let response ;
    if(ObjectId.isValid(item)){
        response = await Collection.findById(item)
    }
    else{  
     const exp = new RegExp(item,'i'); // 
     
     if(Collection === User){
            response = await User.find({
            $or:[{name:exp},{email:exp}],
            $and:[{state:true}] });  
         }     
     else{
            response = await Collection.find({
            $or:[{name:exp},],
            $and:[{state:true}] }).populate('createdBy','name');  
         }

     }

    
    
    
    
    return response || [];
}



const SearchSomething = async (req,res = Response)=>{
    const {collection,name} = req.params;
    if(!Object.keys(collectionAvailable).includes(collection)){
        return res.status(400).json({
            msg:`Collection: ${collection} isn't available`
        })
    }
    const item = await searchByNameOrUid(name,collectionAvailable[collection]);
    res.json({
        msg: `Search... ${name} into ${collection}`,
        result:item 
    })
}





module.exports = {
    SearchSomething
}