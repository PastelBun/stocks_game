import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Portfolio", portfolioSchema);
