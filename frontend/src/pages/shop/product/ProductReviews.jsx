import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ThumbsUp, X } from "lucide-react";
import { reviews } from "../../../components/reviews.js";
import { toast } from "sonner";

const ProductReviews = ({ productId }) => {
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
    name: "",
  });

  const productReviews = reviews.filter((r) => r.productId === productId);

  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, r) => sum + r.rating, 0) /
        productReviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = productReviews.filter((r) => r.rating === rating).length;
    return {
      rating,
      count,
      percentage:
        productReviews.length > 0
          ? (count / productReviews.length) * 100
          : 0,
    };
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    toast.success("Thank you for your review! Pending moderation.");
    setShowForm(false);
    setNewReview({ rating: 5, title: "", comment: "", name: "" });
  };

  const renderStars = (rating, interactive = false, onRate) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={interactive ? () => onRate(star) : undefined}
        >
          <Star
            size={interactive ? 22 : 16}
            className={
              star <= rating
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-600"
            }
          />
        </button>
      ))}
    </div>
  );

  return (
    <>
      <section className="border-t border-yellow-500/20 py-14 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif text-white mb-10">
              Customer Reviews
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* SUMMARY */}
              <div>
                <div className="mb-6">
                  <div className="text-4xl font-serif text-yellow-500">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="mt-2">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Based on {productReviews.length} reviews
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {ratingDistribution.map(({ rating, percentage, count }) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm w-10 text-gray-300">
                        {rating}★
                      </span>
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400 w-6">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-2.5 border border-yellow-500 text-yellow-500
                             hover:bg-yellow-500 hover:text-black
                             transition-all tracking-widest text-xs"
                >
                  WRITE A REVIEW
                </button>
              </div>

              {/* REVIEWS */}
              <div className="lg:col-span-2">
                {productReviews.length > 0 ? (
                  <div className="space-y-8">
                    {productReviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        viewport={{ once: true }}
                        className="border-b border-yellow-500/20 pb-6"
                      >
                        <div className="flex justify-between mb-2">
                          <div>
                            {renderStars(review.rating)}
                            <h4 className="text-white mt-1">
                              {review.title}
                            </h4>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-gray-400 text-sm mb-3">
                          {review.comment}
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-300">
                            {review.userName}
                          </span>
                          <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-yellow-500">
                            <ThumbsUp size={12} /> Helpful
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-10">
                    No reviews yet.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center
                       bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setShowForm(false)}
          >
            <motion.form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmitReview}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-yellow-500/30
                         rounded-xl p-6 w-full max-w-md space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-white">Write a Review</h3>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-yellow-500"
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Rating
                </label>
                {renderStars(newReview.rating, true, (r) =>
                  setNewReview({ ...newReview, rating: r })
                )}
              </div>

              <input
                required
                placeholder="Your Name"
                className="w-full bg-black border border-yellow-500/30
                           px-4 py-2.5 text-white outline-none text-sm"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
              />

              <input
                required
                placeholder="Review Title"
                className="w-full bg-black border border-yellow-500/30
                           px-4 py-2.5 text-white outline-none text-sm"
                value={newReview.title}
                onChange={(e) =>
                  setNewReview({ ...newReview, title: e.target.value })
                }
              />

              <textarea
                required
                rows={3}
                placeholder="Write your review..."
                className="w-full bg-black border border-yellow-500/30
                           px-4 py-2.5 text-white outline-none resize-none text-sm"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-600 text-gray-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-yellow-500 text-black
                             font-semibold tracking-widest text-xs"
                >
                  Submit
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductReviews;
