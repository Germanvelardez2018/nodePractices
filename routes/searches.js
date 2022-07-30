
const { Router } = require('express');
const {login, googleSignIn} = require('../controllers/auth');
const {check} = require('express-validator');
const {CheckFields} = require('../middlewares/checks');

const {SearchSomething} = require('../controllers/searches');
        
        




const router = Router();









router.get('/:collection/:items',[
  //  check('email','Email is required').not().isEmpty(),
  //  check('id_token','ID Token is required').not().isEmpty(),
  //  CheckFields

] ,SearchSomething );


module.exports = router;