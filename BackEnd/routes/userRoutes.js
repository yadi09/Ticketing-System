import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { validateLogin, validateRegister } from "../middlewares/validators.js";

const router = express.Router();

// Routes
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;
