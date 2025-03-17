import mongoose, {Document, Schema} from "mongoose";

interface IChart extends Document {
    amount: number;
    product: mongoose.Types.ObjectId;
}
const ChartSchema=new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    timestamp:{
        required:true,
        type:Date
    }
})

export default mongoose.model<IChart>('Chart', ChartSchema);