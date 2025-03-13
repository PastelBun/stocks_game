import { Router } from "express";
import portfolioController from "../controllers/portfolioController"; // Ensure this import is correct

const router: Router = Router();

router.post("/buy/:id", portfolioController.buyProduct);
router.post("/sell/:id", portfolioController.sellProduct);

export default router;
