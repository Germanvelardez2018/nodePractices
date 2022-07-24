
const { Router } = require('express');


// Custom Middleware
const { CheckFields,validateJWT,isRole} = require('../middlewares/index')

//Middleware from express
const {check} = require('express-validator');


// Controllers
const { listUsersGet,
        getUser,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users');

// Utils
const { validateRole, validateDuplicateEmail, existIdUser } = require('../utils/db-validators');


const router = Router();

// Get route
router.get('/list', listUsersGet );
router.get('/',getUser);


//Put route
router.put('/:id',[
    check('id', "It isn't a id valid").isMongoId(),
    check('id').custom((id)=>existIdUser(id)),
    check('role').custom((role ) =>validateRole(role)),
    CheckFields
] ,usersPut );


//Post route
router.post('/',[
    check('email','The email is not valid').isEmail(),
    check('email').custom(email => validateDuplicateEmail(email)),
    check('name', 'Name is required').not().not().isEmpty(),
    check('password', 'Password is required. Min has to over 6 chars').isLength({min: 6}),
    check('role').custom((role ) =>validateRole(role)),
    CheckFields
], usersPost );


// Delete Route
router.delete('/:id',
[ validateJWT,
  isRole("ADMIN_ROLE"),
  check('id', "It isn't a id valid").isMongoId(),
  check('id').custom((id)=>existIdUser(id))]
, usersDelete );




//Path route
router.patch('/', usersPatch );




module.exports = router;