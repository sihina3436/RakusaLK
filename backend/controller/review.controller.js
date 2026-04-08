const Review = require('../model/review.model');
const mongoose = require("mongoose");

//  Create Review
exports.createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        
        const userId = req.user._id;

        if (!productId || !rating) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newReview = new Review({
            productId: new mongoose.Types.ObjectId(productId),
            userId: new mongoose.Types.ObjectId(userId),
            rating,
            comment
        });

        const savedReview = await newReview.save();

        res.status(201).json(savedReview);

    } catch (error) {
        console.error("CREATE REVIEW ERROR:", error);
        res.status(500).json({ message: 'Error creating review', error });
    }
};

//  Get Reviews
exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId })
            .populate("userId", "username") 
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);

    } catch (error) {
        console.error("GET REVIEWS ERROR:", error);
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};