const { Router } = require('express');
const {login, googleSignIn} = require('../controllers/auth');
const {check} = require('express-validator');
const { CheckFields,validateJWT,isRole} = require('../middlewares/index')
const { existIdCategory,validateRole, validateDuplicateEmail, existIdUser } = require('../utils/db-validators');

// Controllers
const { createCategory, 
        getListCategories,
        getCategoryById,
        putCategory,
        deleteCategory
       } = require('../controllers/category');



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
router.put('/:id',
            validateJWT,
            isRole("ADMIN_ROLE"),
            [check('id', "It isn't a id valid").isMongoId(),
            check('id').custom((id)=>existIdCategory(id)),
            CheckFields],
                putCategory);



//Delete   a category, it requires a valid token and ADMIN ROLE
router.delete('/:id',
[   validateJWT,
    isRole("ADMIN_ROLE"),
    check('id', "It isn't a id valid").isMongoId(),
    check('id').custom((id)=>existIdUser(id))],
    deleteCategory);






    
module.exports = router;