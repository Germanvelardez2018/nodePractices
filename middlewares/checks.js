const { validationResult } = require('express-validator');


const CheckFields = (req,res,next) =>{

    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json({CheckFields_ERROR:errors})    
    }
    next();
}



module.exports = {
    CheckFields
}