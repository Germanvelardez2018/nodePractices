const { Schema,model } = require("mongoose");



const UserSchema = Schema ({
    name : {
        type: String,
        required: [true,'The name is required']
    },
    email:{
        type: String,
        required: [true,'The email is required'],
        unique : true
    },
    password:{
        type: String,
        require: [true,'The password is required']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: false,
        enum:['ADMIN_ROLE',"USER_ROLE"]
    },
    state:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});





module.exports = new model('User',UserSchema);