import axios from "axios";
import { body, cookie, header, validationResult } from "express-validator";

const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export const validationReq = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
}

export const registerValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres")
        .trim()
        .isLength({ min: 6 }),
    body("password", "Formato de password incorrecta").custom(
        (value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("No coinciden las contraseñas");
            }
            return value;
        }
    ),
    validationResultExpress,
];

export const loginValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres")
        .trim()
        .isLength({ min: 6 }),
    validationResultExpress,
];

export const tokenHeaderValidator = [
    header("authorization", "No existe el token")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const tokenCookieValidator = [
    cookie("refreshToken", "No existe refresh Token")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const linkValidator = [
    body("url", "URL inválida")
        .trim()
        .isURL()
        .custom(async (value) => {
            try{
                if(!value.startsWith("http://")) {
                    value = "https://" + value;
                }
                await axios.get(value);
                return value;
            }catch(error){
                throw new Error("URL 404 no encontrada");
            }
        }),
    validationResultExpress
];

export const paramLinkValidator = [
    body("id", "ID inválido")
        .trim()
        .notEmpty()
        .isMongoId()
        .escape(),
    validationResultExpress
];