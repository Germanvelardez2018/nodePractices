const jwt = require('jsonwebtoken');



const getJwt  =  (data = '') =>{

    return new Promise((resolve,reject)=>{

        const payload = { data };
        jwt.sign(payload,process.env.SECRECTKEY,{
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