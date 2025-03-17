import {Request, Response} from "express";
import Product from "../models/product";

const updatePrice=async(req: Request, res: Response)=>{

    try{
        const product = await Product.findById(req.body.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        const id=req.body.id;
        const updatedPrice=req.body.price;
        const options={ new: true }

        const result=await Product.findByIdAndUpdate(
            id, updatedPrice, options
        );

        res.send(result);
    }
    catch (error){
        res.status(500).json({ message:error })
    }
}
const updateAmount=async(req: Request, res: Response)=>{

    try{
        const product = await Product.findById(req.body.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        const id=req.body.id;
        const updatedAmount=req.body.amount;
        const options={ new: true }

        const result=await Product.findByIdAndUpdate(
            id, updatedAmount, options
        );

        res.send(result);
    }
    catch (error){
        res.status(500).json({ message:error })
    }
}

export default {
    updatePrice,
    updateAmount
}