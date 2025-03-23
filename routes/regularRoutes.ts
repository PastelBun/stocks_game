import { Router } from "express";
import portfolioController from "../controllers/portfolioController";
import Product from "../models/product";
import Portfolio from "../models/portfolio";
import Chart from "../models/chart";

const router: Router = Router();

// Buying and selling routes
router.post("/buy/:id", portfolioController.buyProduct);
router.post("/sell/:id", portfolioController.sellProduct);

// Render the products page
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.render("products", { products });
    } catch (error) {
        res.status(500).send("Error loading products");
    }
});

// Render the portfolio page
router.get("/portfolio", async (req, res) => {
    try {
        const portfolio = await Portfolio.find().populate("product");
        res.render("portfolio", { portfolio });
    } catch (error) {
        res.status(500).send("Error loading portfolio");
    }
});

// Render the chart page
router.get("/charts", async (req, res) => {
    try {
        const charts = await Chart.find().populate("product");
        res.render("charts", { charts });
    } catch (error) {
        res.status(500).send("Error loading charts");
    }
});

export default router;
