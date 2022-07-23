const mongoose = require('mongoose');

const dbConnection = async ( ) =>{
    try {
        await mongoose.connect(process.env.DBCONNECTION,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('mongo db ready');
    } catch (error) {
        console.log('app crashed--------------------------------------');
        console.log(error)
        throw new Error('Error at db Mongo---------------------------');
    }


}


module.exports = {
    dbConnection
}