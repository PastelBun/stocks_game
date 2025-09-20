import { Request, Response } from "express";
import Product from "../models/product";


const createProduct = async (req: Request, res: Response) => {
    const data = new Product({
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price
    });

    try {
        const dataToSave = await data.save();
        const allProducts = await Product.find();  // Get the updated product list
        res.render("products", { products: allProducts });  // Pass all products to the view
    } catch (error) {
        res.status(400).send({ message: error });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        const data = await Product.find();  // Get the updated list after deletion
        res.render("products", { products: data });  // Render with updated list
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Product.findByIdAndUpdate(id, updatedData, options);
        const data = await Product.find();  // Fetch updated list
        res.render("products", { products: data });  // Render with updated list
    } catch (error) {
        res.status(500).send({ message: error });
    }
};


const getAllProducts=async (req:Request, res:Response)=>{
    try {
        const result = await Product.find({}).lean();
        res.render(JSON.stringify(result));
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