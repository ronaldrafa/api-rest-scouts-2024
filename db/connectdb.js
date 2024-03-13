import mongoose from "mongoose";

try{
    mongoose.connect(process.env.URI_MONGODB);
    console.log("Database connected successfully");
} catch (error) {
    console.log("Error connecting to database");
}
