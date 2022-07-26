
const { Router } = require('express');
const {login, googleSignIn} = require('../controllers/auth');
const {check} = require('express-validator');
const {CheckFields} = require('../middlewares/checks');

        
        




const router = Router();


router.post('/login',[
    check('email','Email is required').not().isEmpty(),
    check('email','It must be a valid format').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    CheckFields
] ,login );


router.post('/google',[
    check('email','Email is required').not().isEmpty(),
    check('id_token','ID Token is required').not().isEmpty(),
    CheckFields

] ,googleSignIn );


module.exports = router;