import {Request, Response} from "express";
import Product from "../models/product";
import Chart from '../models/chart';
const updatePriceLogic=async()=>{
    const products = await Product.find().lean();
    for(const product of products){
        const previousPrice = product.price;
        const multiplier = Math.random() *(1.2-0.8)+0.8;
        const updatedPrice = parseFloat((product.price * multiplier).toFixed(1));

        const options = {new:true}
        const percentageChange = ((Math.round(updatedPrice) - previousPrice) / previousPrice) * 100;


        const chartEntry = new Chart({
            product: product._id,
            previousPrice,
            currentPrice: updatedPrice,
            percentageChange,
        });
        await chartEntry.save();
        const result = await Product.findByIdAndUpdate(product._id,{price:updatedPrice},options);
        
    }

}
const updateAmountLogic = async () => {
    try {
      const products = await Product.find().lean();
      for (const product of products) {
        const options = { new: true };
        if(product.amount >=0){
            const multiplier = Math.floor(Math.random() * 10) - 5;
            const updatedAmount = product.amount + multiplier;
            const result = await Product.findByIdAndUpdate(product._id, { amount: updatedAmount }, options);
        }
        else{
            const updatedAmount = 1;
            const result = await Product.findByIdAndUpdate(product._id, { amount: updatedAmount }, options);
        }
        
      }
    } catch (error) {
      console.error("Error updating amounts:", error);
    }
  };

const updatePrice = async(req:Request,res:Response)=>{
    try{
        const resultsPrice = await updatePriceLogic();
        res.status(200).send(resultsPrice);
    }
    catch(error){
        res.status(500).send({message:error});
    }
}
const updateAmount = async(req:Request,res:Response)=>{
    try {
        const resultsAmount = await updateAmountLogic();
        res.status(200).send(resultsAmount);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

setInterval(updateAmountLogic,3000);
setInterval(updatePriceLogic,5000);
export default {
    updatePrice,
    updateAmount
}