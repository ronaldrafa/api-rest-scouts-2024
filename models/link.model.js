import mongoose from "mongoose";

const { Schema, model } = mongoose;

const linkSchema = new Schema({
    url: {
        type: String,
        required: true,
        trim: true
    },
    nanoLink: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        trim: true
    }
});

export const Link = model("Link", linkSchema);