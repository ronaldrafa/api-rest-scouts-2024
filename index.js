import "dotenv/config";
import "./db/connectdb.js";
import express from "express";
import authRoute from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.use('/api/v1', authRoute);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Server is running on port "+PORT+" http://localhost:7000/");
}); 