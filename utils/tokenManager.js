import jwt from "jsonwebtoken";

export const generateToken = (uid) => { 
    const expiresIn = 60 * 15;

    try{
        const token = jwt.sign({uid}, process.env.JWT_SECRET, { expiresIn });
        return { token, expiresIn };
    }catch (error) {
        console.log(error);
    }
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try{
        const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH_SECRET, { expiresIn });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.NODE_ENV === "desarrollo"),
            expire: new Date(Date.now() + expiresIn * 1000)
        });
        //return { refreshToken, expiresIn };
    } catch (error) {
        console.log(error);
    }
};

export const tokenVerificationErrors = {
    "invalid signature": "La firma del token no es válida",
    "jwt expired": "El token ha expirado",
    "invalid token": "El token no es válido",
    "jwt malformed": "El token no es válido",
    "jwt not active": "El token no está activo",
    "jwt signature is required": "La firma del token es requerida",
    "jwt audience invalid": "El token no es válido",
    "jwt issuer invalid": "El token no es válido",
    "jwt id invalid": "El token no es válido",
    "jwt subject invalid": "El token no es válido",
    "jwt token is required": "El token es requerido",
    "No Bearer": "Utiliza formato Bearer en el token"
};