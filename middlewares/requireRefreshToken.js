import jwt from 'jsonwebtoken';
import { tokenVerificationErrors  } from '../utils/tokenManager.js';

export const requireRefreshToken = (req, res, next) => {
    try{
        const refreshTokenCooke = req.cookies.refreshToken;
        if (!refreshTokenCooke) throw new Error("No existe el token");
        
        const { uid } = jwt.verify(refreshTokenCooke, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    }catch(err){
        console.log(err);
        return res
                .status(401)
                .send({ error: tokenVerificationErrors[err.message]});
    }
};