import { Router } from "express";
import chartController from "../controllers/chartController";
import changeController from "../controllers/changeController";

//these need to be automated, so they trigger after every set time
const router: Router=Router();
//every 5 seconds
router.post("/chart", chartController.addToChart);
//every 3 seconds random chance (50/50) of -5 to +5
router.put("/amount", changeController.updateAmount);
//every 5 seconds 0.8-1.2 multiplication
router.put("/price", changeController.updatePrice);
export default router;