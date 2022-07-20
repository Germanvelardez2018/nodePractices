
const { Router } = require('express');

const {check} = require('express-validator');
const {CheckFields} = require('../middlewares/checks');

const Role = require('../models/role');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users');

const { validateRole, validateDuplicateEmail } = require('../utils/db-validators');

const router = Router();


router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/',[
    check('email','The email is not valid').isEmail(),
    check('email').custom(email => validateDuplicateEmail(email)),
    check('name', 'Name is required').not().not().isEmpty(),
    check('password', 'Password is required. Min has to over 6 chars').isLength({min: 6}),
    check('role').custom((role ) =>validateRole(role)),
    CheckFields
], usersPost );

router.delete('/', usersDelete );

router.patch('/', usersPatch );





module.exports = router;