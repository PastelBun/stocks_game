import mongoose, { Schema, Document } from "mongoose";

interface IPortfolio extends Document {
    amount: number;
    product: mongoose.Types.ObjectId;
}

const PortfolioSchema = new Schema<IPortfolio>({
    amount: { type: Number, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
});

export default mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
