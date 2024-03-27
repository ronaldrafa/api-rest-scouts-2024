import "dotenv/config";
import "./db/connectdb.js";
import express from "express";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import linkRouter from "./routes/link.router.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/link', linkRouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Server is running on port "+PORT+" http://localhost:"+PORT+"/");
}); 