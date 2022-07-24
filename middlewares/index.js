const middlewareCheckJWT = require('../middlewares/check-jwt');
const middlewareCheckRole = require('../middlewares/is-role');
const middlewareCheckFields = require('../middlewares/checks');


module.exports={
    ...middlewareCheckJWT,
    ...middlewareCheckRole,
    ...middlewareCheckFields
}