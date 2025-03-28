import mongoose, { Schema, Document } from "mongoose";

interface ILossGain extends Document {
    product: mongoose.Schema.Types.ObjectId;
    previousPrice: number;
    currentPrice: number;
    percentageChange: number;
    timestamp: Date;
}

const LossGainSchema = new Schema<ILossGain>({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    previousPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    percentageChange: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ILossGain>("LossGain", LossGainSchema);