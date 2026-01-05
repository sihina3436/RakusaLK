const Color = require("../model/colors.model");

const createColor = async (req, res) => {
    try {
        if (req.user.role !== "seller" && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const color = await Color.create({
            name: req.body.name,
            hexCode: req.body.hexCode,
            createdBy: req.user._id,
        });
        res.status(201).json(color);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getAllColors = async (req, res) => { 
    try {
        const colors = await Color.find();
        res.status(200).json(colors);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createColor, getAllColors };