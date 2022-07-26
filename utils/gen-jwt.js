const jwt = require('jsonwebtoken');



const getJwt  =  (data = '') =>{

    return new Promise((resolve,reject)=>{
        const payload = { uid:data };
        jwt.sign(payload,process.env.SECRETKEY,{
            expiresIn:'2h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('error at generate jwt');
            }
            else{
                resolve(token);
            }
        }
        );
      });
}


module.exports= {
    getJwt

}