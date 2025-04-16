import { Request, Response } from "express";
import Product from "../models/product";


const createProduct=async (req: Request, res: Response) => {
    const data = new Product({
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price
    })

    try {
        const dataToSave = await data.save();
        //res.status(200).json(dataToSave)
        res.render("product",{dataToSave});
    }
    catch (error) {
        //res.status(400).json({ message:error })
        res.status(400).send({ message:error })
    }
};
const deleteProduct=async (req: Request, res: Response)=>{
  try{
      const id=req.params.id;
      await Product.findByIdAndDelete(id);
      const data=await Product.find();
      res.send(data);
      res.render("product",{data});
  }
  catch (error){
      //res.status(500).json({ message:error })
      res.status(500).send({ message:error })
  }
}
const updateProduct=async (req: Request, res: Response)=>{
    try{
        const id=req.params.id;
        const updatedData=req.body;
        const options={ new: true }

        const result=await Product.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);
        const data = await Product.find();
        res.render("product",{data});
    }
    catch (error){
        //res.status(500).json({ message:error })
        res.status(500).send({ message:error })

    }
};
const getAllProducts=async (req:Request, res:Response)=>{
    try {
        const result = await Product.find();
        res.render("product",{result});
    }
    catch (error) {
        //res.status(500).json({ message:error })
        res.status(500).send({ message:error })
    }
}
export default {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts
}