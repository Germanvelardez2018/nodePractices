const { Router } = require('express');
const {login, googleSignIn} = require('../controllers/auth');
const {check} = require('express-validator');
const {CheckFields} = require('../middlewares/checks');
const { validate } = require('../models/user');

const{existIdCategory} = require("../utils/db-validators");
const {validateJWT} = require('../middlewares/check-jwt');
        
const { createCategory, 
        getListCategories,
        getCategoryByName,
        getCategoryById
       } = require('../controllers/category');


const controler = (req,res)=>{
    res.json({ msg: "ok"});
}
      



const router = Router();




// Get a list of category
router.get('/list',getListCategories);


//Get a category by id
router.get('/:id',[
   check('id', "It isn't a id valid").isMongoId(),
   check('id').custom((id)=>existIdCategory(id)),
                        CheckFields],
                        getCategoryById);


// Create a new category, it requires valid token
router.post('/add',[
    check('name','the name is required').not().isEmpty(),
    validateJWT,
    CheckFields
],createCategory);



//Update  a category, it requires a valid token
router.put('/:id',[],controler);



//Delete   a category, it requires a valid token and ADMIN ROLE
router.delete('/:id',[],controler);



module.exports = router;