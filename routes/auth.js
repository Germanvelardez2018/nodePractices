
const { Router } = require('express');
const {login} = require('../controllers/auth');
const {check} = require('express-validator');
const {CheckFields} = require('../middlewares/checks');

        
        




const router = Router();


router.post('/login',[
    check('email','Email is required').not().isEmpty(),
    check('email','It must be a valid format').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    CheckFields

] ,login );


module.exports = router;