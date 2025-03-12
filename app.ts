import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/product";
import productController from "./controllers/productController";

dotenv.config(); // Ensure .env is loaded first

const app: Express = express();
const url = process.env.MONGOLAB_URI;
if (!url) {
    console.error("MongoDB connection string is missing! Check your .env file.");
    process.exit(1);
}
console.log(url); // Debugging

mongoose.connect(url)
    .then(() => console.log("Database Connected"))
    .catch((error) => console.error("MongoDB Connection Error:", error));

const database = mongoose.connection;
database.on("error", (error) => console.log("DB Error:", error));

app.get("/", async (req: Request, res: Response) => {
    try{
        const products= await Product.find();
        res.json(products)
    }
    catch (error){
        res.status(500).json({ message: error })
    }
});

app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});
