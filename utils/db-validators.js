const Role = require('../models/role');
const User = require('../models/user');

   const validateRole =  async (role='')=>{
        
    const roleValid = await Role.findOne({role} );

    if(!roleValid){
        throw new Error(`role: ${role} is not a valid role`);
    }
   };




   const validateDuplicateEmail = async (email = '') =>{
    const alreadyeMail = await  User.findOne({email});
    if(alreadyeMail) 
        {
            throw new Error(' this email is already exists');
        } 
   }


  const existIdUser = async (id = "")=>{
    const user = await User.findById(id);
    if(!user){
        throw new Error(`The id: ${id} doesnt exit` );
    }
  }



   module.exports={
    validateRole,
    validateDuplicateEmail,
    existIdUser
   }