const Review = require('../model/review.model');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;
        const newReview = new Review({ productId, userId, rating, comment });
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error });
    }
};

// Get all reviews for a product
exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId })
            .populate("userId", "username"); 

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};