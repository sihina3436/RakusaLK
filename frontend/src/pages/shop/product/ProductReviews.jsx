import { useState } from "react";
import {motion ,AnimatePresence } from "framer-motion";
import { Star, ThumbsUp, X } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateReviewMutation,
  useGetReviewsByProductIdQuery,
} from "../../../redux/review/reviewAPI";



const ProductReviews = ({ productId, user }) => {
  const [showForm, setShowForm] = useState(false);
  

  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
  });

  const {
    data: productReviews = [],
    isLoading,
  } = useGetReviewsByProductIdQuery(productId);

  const [createReview, { isLoading: isSubmitting }] =
    useCreateReviewMutation();

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

  console.log("Fetched Reviews:", productReviews);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    try {
      await createReview({
        productId,
        userId: user._id,
        rating: newReview.rating,
        comment: newReview.comment,
      }).unwrap();

      toast.success("Review submitted successfully!");

      setShowForm(false);
      setNewReview({
        rating: 5,
        title: "",
        comment: "",
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit review");
    }
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
          <h2 className="text-2xl font-serif text-white mb-10">
            Customer Reviews
          </h2>

          {isLoading ? (
            <p className="text-gray-400 text-center py-10">
              Loading reviews...
            </p>
          ) : (
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
                  {ratingDistribution.map(
                    ({ rating, percentage, count }) => (
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
                    )
                  )}
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
                    {productReviews.map((review) => (
                      <div
                        key={review._id}
                        className="border-b border-yellow-500/20 pb-6"
                      >
                        {renderStars(review.rating)}

                        <p className="text-gray-400 text-sm mt-3">
                          {review.comment}
                        </p>

                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-300">
                            {review.userId?.username}

                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-10">
                    No reviews yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center
                       bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setShowForm(false)}
          >
            <motion.form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmitReview}
              className="bg-black border border-yellow-500/30
                         rounded-xl p-6 w-full max-w-md space-y-4"
            >
              <h3 className="text-lg text-white">Write a Review</h3>

              {renderStars(newReview.rating, true, (r) =>
                setNewReview({ ...newReview, rating: r })
              )}

              <textarea
                required
                rows={3}
                placeholder="Write your review..."
                className="w-full bg-black border border-yellow-500/30
                           px-4 py-2.5 text-white outline-none resize-none text-sm"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    comment: e.target.value,
                  })
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
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-yellow-500 text-black
                             font-semibold tracking-widest text-xs"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
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