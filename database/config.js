const mongoose = require('mongoose');

const dbConnection = async ( ) =>{
    try {
        await mongoose.connect("mongodb+srv://germandevz:4545logicos2@mycluster.tqgsjov.mongodb.net/users",{
            useUnifiedTopology: true,
        });
        console.log('mongo db ready');
    } catch (error) {
        console.log(error)
        throw new Error('Error at db Mongo');
    }


}


module.exports = {
    dbConnection
}