import { Router } from "express";
import { 
    login, 
    logout,
    register, 
    refreshToken
} from "../controllers/auth.controller.js";
import {
    loginValidator,
    registerValidator
} from "../middlewares/validatorManager.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";

const router = Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

router.get("/refresh-token", requireRefreshToken, refreshToken);
router.get("/logout", logout);

export default router;