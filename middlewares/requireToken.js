import jwt from "jsonwebtoken";
import { tokenVerificationErrors  } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
  try{
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    token = token.split(" ")[1];

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  }catch(err){
    console.log(err);
    
    return res
        .status(500)
        .send( {error: tokenVerificationErrors[err.message] || "Server error" });
  }
};