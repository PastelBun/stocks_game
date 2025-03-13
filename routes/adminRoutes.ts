import { Router } from "express";
import productController from "../controllers/productController";

const router: Router=Router();

router.post("/product", productController.createProduct);
router.delete("/product/:id", productController.deleteProduct);
router.put("/product/:id", productController.updateProduct);

export default router;