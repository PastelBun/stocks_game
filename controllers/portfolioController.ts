import { Request, Response } from "express";
import Portfolio from "../models/portfolio";
import Product from "../models/product"; // Ensure this model is imported

const buyProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        const existingPortfolioItem = await Portfolio.findOne({ product: req.params.id });

        if (!existingPortfolioItem) {
            const data = new Portfolio({
                amount: req.body.amount,
                product: req.params.id
            });

            const dataToSave = await data.save();
            res.status(201).json(dataToSave);
        } else {
            existingPortfolioItem.amount += req.body.amount;
            const updatedPortfolio = await existingPortfolioItem.save();
            res.status(200).json(updatedPortfolio);
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const sellProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const portfolioItem = await Portfolio.findById(req.params.id);
        if (!portfolioItem) {
            res.status(404).json({ message: "Portfolio item not found" });
            return;
        }

        const updatedAmount = portfolioItem.amount - req.body.amount;

        if (updatedAmount <= 0) {
            await Portfolio.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Product sold completely, removed from portfolio" });
        } else {
            portfolioItem.amount = updatedAmount;
            const updatedPortfolio = await portfolioItem.save();
            res.status(200).json(updatedPortfolio);
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export default { buyProduct, sellProduct };
