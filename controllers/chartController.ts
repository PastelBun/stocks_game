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
setInterval(addToChart,3000);
export default {
addToChart
};