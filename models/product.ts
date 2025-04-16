import mongoose, { Schema, Document } from "mongoose";


interface IProduct extends Document {
    name: string;
    amount: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}


const productSchema: Schema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,  
});

export default mongoose.model<IProduct>("Product", productSchema);