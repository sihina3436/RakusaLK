const Size = require("../model/size.model");    


const createSize = async (req, res) => {
    try {
        if (req.user.role !== "seller" && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const size = await Size.create({
            name: req.body.name,
        });
        res.status(201).json(size);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }


};

const getAllSizes = async (req, res) => { 
    try {
        const sizes = await Size.find();    
        res.status(200).json(sizes);
    }

    catch (err) {
        res.status(500).json({ message: err.message });
    }   
};

const getSizeById = async (req, res) => {
    try {
        const size = await Size.findById(req.params.id);
        if (!size) {
            return res.status(404).json({ message: "Size not found" });
        }
        res.status(200).json(size);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { createSize, getAllSizes, getSizeById };