import mongoose from "mongoose";

const product=new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    amount:{
        required:true,
        type: Number
    },
    price:{
        required:true,
        type: Number
    }
})

export default mongoose.model('Product', product)