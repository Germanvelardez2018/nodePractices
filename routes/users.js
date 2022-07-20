
const { Router } = require('express');

const {check} = require('express-validator');
const {CheckFields} = require('../middlewares/checks');

const Role = require('../models/role');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users');

const router = Router();


router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/',[
    check('email','The email is not valid').isEmail(),
    check('name', 'Name is required').not().not().isEmpty(),
    check('password', 'Password is required. Min has to over 6 chars').isLength({min: 6}),
    check('role').custom(async (role='')=>{
        
    const roleValid = await Role.findOne({role});

    console.log(`roleValid:${role} `);
    console.log('antes  del rolevalid')
    if(!roleValid){
        throw new Error(`roleValid:${role} is not a valid role`);
    }else{
        console.log("pasamos el role valid");
    }
   }),
    CheckFields
], usersPost );

router.delete('/', usersDelete );

router.patch('/', usersPatch );





module.exports = router;