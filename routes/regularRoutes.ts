import { Router } from "express";
import portfolioController from "../controllers/portfolioController";

const router: Router = Router();

router.post("/buy/:id", portfolioController.buyProduct);
router.post("/sell/:id", portfolioController.sellProduct);

export default router;
