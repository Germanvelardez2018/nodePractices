const Role = require('../models/role');
const User = require('../models/user');

   const validateRole =  async (role='')=>{
        
    const roleValid = await Role.findOne({role});

    if(!roleValid){
        throw new Error(`roleValid:${role} is not a valid role`);
    }
   };




   const validateDuplicateEmail = async (email = '') =>{
    const alreadyeMail = await  User.findOne({email});
    if(alreadyeMail) 
        {
            throw new Error(' this email is already exists');
        } 
   }


   module.exports={
    validateRole,
    validateDuplicateEmail
   }