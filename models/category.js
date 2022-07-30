const { Schema,model } = require("mongoose");



const CategorySchemma = Schema ({
    name : {
        type: String,
        required: [true,'The name is required'],
        unique : true
    },
    state:{
        type: Boolean,
        default:true,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref : 'User',
        required:[true, 'Is required']
    }
 
});


CategorySchemma.methods.toJSON = function (){
    const {__v, state,_id, ...dataPublic} = this.toObject();
    dataPublic.uid = _id;
    return dataPublic
}


module.exports =  model('Category',CategorySchemma);