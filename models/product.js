const { Schema,model } = require("mongoose");


const ProductSchemma = Schema ({
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
        required:[true, "It's required"]
    },
    price:{
        type: Number,
        default:0,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref : 'Category',
        required:[true, "It's required"]
    },
    description:{
        type: String
    },
    Stock:{
        type: Number,
        default:0,
        required:[true, "It's required"]
    },
    Available:{
        type:Boolean,
        required:[true, "It's required"],
        default:true
    }

 
});


ProductSchemma.methods.toJSON = function (){
    const {__v, state,_id, ...dataPublic} = this.toObject();
    dataPublic.uid = _id;
    return dataPublic
}


module.exports =  model('Product',ProductSchemma);