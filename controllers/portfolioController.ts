import { Request, Response } from "express";
import Portfolio from "../models/portfolio";
import Product from "../models/product";

const buyProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).send({ message: "Product not found" });
            return;
        }
        const buyAmountRaw = req.body.buyAmount;
        const buyAmount = Number(buyAmountRaw);
        if (!buyAmountRaw || isNaN(buyAmount) || buyAmount <= 0) {
            res.status(400).send({ message: "Invalid buy amount" });
            return;
        }
        let existingPortfolioItem =await Portfolio.findOne({ product: req.params.id });

        if (existingPortfolioItem) {
            existingPortfolioItem.portfolioAmount += buyAmount;
            await existingPortfolioItem.save();
        } else {
            const newPortfolioItem = new Portfolio({
                portfolioAmount: buyAmount,
                product: req.params.id
            });
            console.log(newPortfolioItem)
            console.log(newPortfolioItem.portfolioAmount)
            await newPortfolioItem.save();
        }

        const portfolio = await Portfolio.find().populate("product").lean();
        res.render("portfolio", { portfolio });
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};



const sellProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const portfolioItem = await Portfolio.findById(req.params.id);

        if (!portfolioItem) {
            res.status(404).send({ message: "Portfolio item not found" });
            return;
        }

        const sellAmountRaw = req.body.sellAmount;
        const sellAmount = Number(sellAmountRaw);
        if (!sellAmountRaw || isNaN(sellAmount) || sellAmount <= 0) {
            res.status(400).send({ message: "Invalid buy amount" });
            return;
        }
        const updatedAmount = portfolioItem.portfolioAmount - sellAmount;

        if(updatedAmount<0){
            res.status(400).send({message: "Amount larger than owned"})
            return;
        }
        else if (updatedAmount== 0) {
            await Portfolio.findByIdAndDelete(req.params.id);
        } else {
            portfolioItem.portfolioAmount = updatedAmount;
            await portfolioItem.save();
        }

        const portfolio = await Portfolio.find().populate("product").lean();
        res.render("portfolio", { portfolio });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};



export default { buyProduct, sellProduct };
