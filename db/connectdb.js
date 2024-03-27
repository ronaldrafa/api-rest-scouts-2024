import mongoose from "mongoose";

try{
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
} catch (error) {
    console.log("Error connecting to database");
}
