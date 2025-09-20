import { Router } from "express";
import authController from "../controllers/authController"; // or default export if you use it

const router: Router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/login", authController.LoginPage);
router.get("/register", authController.RegisterPage);
router.get("/logout", authController.logout);

export default router;