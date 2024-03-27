import {User} from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async(req, res) => {
  const { email, password } = req.body;
  try{    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    user = new User({ email, password });
    await user.save();
    
    // Generate jwt token
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json(generateToken(user.id));
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const login =  async(req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Credenciales no registrada" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenciales invalidas" });
    }

    // Generate jwt token
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({token, expiresIn});

  }catch(err){
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const infoUser = async(req, res) => {
  try{
    const user = await User.findById(req.uid).select("-password -__v -_id").lean();
    return res.json(user);
  }
  catch(err){
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const refreshToken = async(req, res) => {
  try{
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Sin autorización" });
    }
    const { uid } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const { token, expiresIn } = generateToken(uid);

    return res.json({ token, expiresIn });
  }
  catch(err){
    console.log(err);
    return res
    .status(500)
    .send( {error: tokenVerificationErrors[err.message] || "Server error" });
  }
}

export const logout = async(req, res) => {
  try{
    res.clearCookie("refreshToken");
    return res.json({ message: "Logged out" });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
}