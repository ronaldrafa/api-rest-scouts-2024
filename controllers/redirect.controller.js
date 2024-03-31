export const redirectLink = async (req, res) => {
    const { nanoLink } = req.params;
    try {
        const link = await Link.findOne({ nanoLink  
        }).exec();
        if (!link) {
            return res.status(404).json({ message: "Link no encontrado" });
        }
        res = link.url;
    }catch (error) {    
        res.status(500).json({ message: error.message });
    }
}