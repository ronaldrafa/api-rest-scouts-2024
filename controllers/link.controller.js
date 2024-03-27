import { Link } from "../models/link.model.js";
import { nanoid } from "nanoid";

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find().where('uid').equals(req.uid).exec();
        res.json({ links });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const createLink = async (req, res) => {
    const { url } = req.body;
    try {
        const newLink = new Link({ url, nanoLink: nanoid(6) ,uid: req.uid });
        await newLink.save();
        res.json({ link: newLink });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLinkById = async (req, res) => {
    const { id } = req.params;
    try {
        const link = await Link.findById(id).exec();
        res.json({ link });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeLink = async (req, res) => {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) {
        return res.status(404).json({ message: "Link no encontrado" });
    }
    if (link.uid.toString() !== req.uid) {
        return res.status(401).json({ message: "No autorizado" });
    }
    try {
        await Link.findByIdAndDelete(id).exec();
        res.json({ message: "Link eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateLink = async (req, res) => {
    try {
        const { id } = req.params;
        const { url } = req.body;
        if (!url.startsWith("https://")) {
            url = "https://" + url;
        }

        const link = await Link.findById(id);

        if (!link) {
            return res.status(404).json({ message: "Link no encontrado" });
        }
        if (link.uid.toString() !== req.uid) {
            return res.status(401).json({ message: "No autorizado" });
        }
    
        await Link.findByIdAndUpdate(id, { url }).exec();
        res.json({ message: "Link actualizado" });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};