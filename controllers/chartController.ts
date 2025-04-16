import { Request, Response } from "express";
import Chart from "../models/chart";
import Product from "../models/product";
import LossGain from "../models/lossgain";

const addToChart=async (req: Request, res: Response)=>{
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    const data = new Chart({
        product: req.body.id,
        timestamp: req.body.date
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error})
    }
}
const getChartData = async (req: Request, res: Response) => {
    try {
        const records = await LossGain.find()
            .populate("product", "name price")
            .sort({ timestamp: 1 });  // Sort by timestamp to ensure chronological order

        // Map the records for charting (timestamps and price changes)
        const chartData = records.map(record => ({
            timestamp: record.timestamp,
            productName: (record.product as any)?.name,
            price: record.currentPrice
        }));

        // Send the chart data to the front-end for rendering
        res.render('charts', { chartData: JSON.stringify(chartData) });
    } catch (error) {
        res.status(500).json({ message: "Error fetching chart data", error });
    }
};

const autoLogChartData = async () => {
    const products = await Product.find();
    for (const product of products) {
        await new Chart({
            product: product._id,
            timestamp: new Date()
        }).save();
    }
};

// run every 3 seconds
setInterval(autoLogChartData, 3000);
export default {
addToChart,autoLogChartData,getChartData
};