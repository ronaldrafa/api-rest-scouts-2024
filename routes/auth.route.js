import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationReq } from "../middlewares/validationReq.js";
const router = express.Router();

router.post("/login",[
    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Enter a valid email"),
    body("password")
        .trim()
        .isLength({ min: 7 })
        .withMessage("Password must be at least 7 characters long")
    ] ,
    validationReq,
    login
);

router.post("/register",[
    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Enter a valid email"),
    body("password")
        .trim()
        .isLength({ min: 7 })
        .withMessage("Password must be at least 7 characters long"),
    body("repassword")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password confirmation does not match password");
            }
            return true;
        })
    ],
    validationReq, 
    register
);

export default router;