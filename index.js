import "dotenv/config";
import "./db/connectdb.js";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import cookieParser from "cookie-parser";
import linkRouter from "./routes/link.router.js";
import redirectRouter from "./routes/redirect.router.js";

const app = express();

const whiteList = [process.env.ORIGIN1];

app.use(cors({
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/', redirectRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/link', linkRouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Server is running on port "+PORT+" http://localhost:"+PORT+"/");
}); 