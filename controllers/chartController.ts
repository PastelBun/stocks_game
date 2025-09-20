import { Request, Response } from "express";
import Chart from "../models/chart";
import Product from "../models/product";


const addToChart=async (req: Request, res: Response)=>{
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    const data = new Chart({
        product: req.body.id,
        price: req.body.currentPrice,


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
        const records = await Chart.find()
            .populate("product", "name price")
            .sort({ timestamp: 1 });  // Sort by timestamp to ensure chronological order

        // Map the records for charting (timestamps and price changes)
        const chartData = records.map(record => ({
            id: record._id,
            currentPrice: record.currentPrice,
            previousPrice: record.previousPrice,
            percentageChange: record.percentageChange,
            timestamp: record.timestamp
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
        const lastChart = await Chart.findOne({ product: product._id })
        .sort({ timestamp: -1 }); // get the most recent chart entry

        const previousPrice = lastChart ? lastChart.currentPrice : 0;
        const currentPrice = product.price;
        const percentageChange = previousPrice !== 0 && previousPrice !== null
        ? ((currentPrice - previousPrice) / previousPrice) * 100
        : 0;

        try {
            await new Chart({
                product: product._id,
                currentPrice: product.price,
                previousPrice: previousPrice,
                percentageChange: percentageChange,
                timestamp: new Date()
            }).save();
        } catch (error) {
            console.error(`Error saving chart data for product ${product._id}:`, error);
        }
    }
};

// run every 3 seconds
setInterval(autoLogChartData, 3000);
export default {
addToChart,autoLogChartData,getChartData
};