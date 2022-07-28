const middlewareCheckJWT = require('./check-jwt');
const middlewareCheckRole = require('./is-role');
const middlewareCheckFields = require('./checks');

module.exports={
    ...middlewareCheckJWT,
    ...middlewareCheckRole,
    ...middlewareCheckFields,
}