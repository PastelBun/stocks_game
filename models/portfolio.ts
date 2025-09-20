// models/portfolio.ts
import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
    portfolioAmount: { type: Number, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
});

export default mongoose.model("Portfolio", portfolioSchema);
