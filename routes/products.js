const { Router } = require('express');
const {login, googleSignIn} = require('../controllers/auth');
const {check} = require('express-validator');
const { CheckFields,validateJWT,isRole} = require('../middlewares/index')
const { existIdProduct,existIdCategory,validateRole, validateDuplicateEmail, existIdUser } = require('../utils/db-validators');

// Controllers
const { createProduct, 
        getListProducts,
        getProductById,
        putProduct,
        deleteProduct
       } = require('../controllers/product');






const router = Router();


// Get a list of product
router.get('/list',getListProducts);


//Get a product by id
router.get('/:id',[
   check('id', "It isn't a id valid").isMongoId(),
   check('id').custom((id)=>existIdProduct(id)),
                        CheckFields],
                        getProductById);


// Create a new product, it requires valid token
router.post('/add',[
    check('name','the name is required').not().isEmpty(),
    check('category').custom((category)=>existIdCategory(category)),
    validateJWT,
    CheckFields
],createProduct);


//Update  a product, it requires a valid token
router.put('/:id',
            validateJWT,
            isRole("ADMIN_ROLE"),
            [check('id', "It isn't a id valid").isMongoId(),
            check('id').custom((id)=>existIdProduct(id)),
            CheckFields],
            putProduct);


//Delete   a product, it requires a valid token and ADMIN ROLE
router.delete('/:id',
[   validateJWT,
    isRole("ADMIN_ROLE"),
    check('id', "It isn't a id valid").isMongoId(),
    check('id').custom((id)=>existIdUser(id))],
    deleteProduct);







module.exports = router;