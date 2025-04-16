import {Request, Response} from "express";
import Product from "../models/product";
import LossGain from "../models/lossgain";
const updatePrice=async(req: Request, res: Response)=>{
 
    try{
        const products = await Product.find();
        for(const product of products){
            const previousPrice = product.price;
            const multiplier = Math.random() *(1.2-0.8)+0.8;
            const updatedPrice = product.price * multiplier;

            const options = {new:true}
            const percentageChange = ((updatedPrice - previousPrice) / previousPrice) * 100;

    
            const lossGainRecord = new LossGain({
                product: product._id,
                previousPrice,
                currentPrice: updatedPrice,
                percentageChange,
            });
            await lossGainRecord.save();
            const result = await Product.findByIdAndUpdate(product._id,{price:updatedPrice},options);
            res.send(result);
        }
    }catch(error){
        res.status(500).send({message:error});
    }
}
const updateAmount=async(req: Request, res: Response)=>{
    try{
        const products = await Product.find();
        for(const product of products){
            const options = {new:true}
            const multiplier = Math.floor(Math.random()*10)-5;
            const updatedAmount = product.amount + multiplier;
            const result = await Product.findByIdAndUpdate(product._id,{amount:updateAmount},options);
            res.send(result);
        }
    }
    catch(error){
        res.status(500).json({message:error});
    }
    
}
setInterval(updateAmount,3000);
setInterval(updatePrice,5000);
export default {
    updatePrice,
    updateAmount
}