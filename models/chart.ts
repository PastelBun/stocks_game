import mongoose, {Document, Schema} from "mongoose";

interface IChart extends Document {
    product: mongoose.Types.ObjectId;
    currentPrice: number;
    previousPrice: number;
    percentageChange: number;
    timestamp: Date;
}

const ChartSchema = new Schema<IChart>({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    currentPrice: { type: Number, required: true },
    previousPrice: { type: Number, required: true },
    percentageChange: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IChart>('Chart', ChartSchema);