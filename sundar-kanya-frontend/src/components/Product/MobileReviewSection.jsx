import "./MobileReviewSection.css";

function MobileReviewSection({
  user,
  reviews,
  averageRating,
  totalReviews,
  rating,
  setRating,
  comment,
  setComment,
  handleReviewSubmit,
}) {
  return (
    <section className="mobile-review-section">

      <div className="review-header">

        <h2>Customer Reviews</h2>

        <div className="review-summary">

          <h1>{averageRating.toFixed(1)}</h1>

          <span>★★★★★</span>

          <p>{totalReviews} Reviews</p>

        </div>

      </div>

      <div className="review-list">

        {reviews.map((review) => (

          <div
            className="review-card"
            key={review._id}
          >

            <div className="review-top">

              <div>

                <h4>{review.user?.name}</h4>

                <small>
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>

              </div>

              <span className="review-stars">
                {"⭐".repeat(review.rating)}
              </span>

            </div>

            <p>{review.comment}</p>

          </div>

        ))}

      </div>

      {user && (

        <form
          className="review-form"
          onSubmit={handleReviewSubmit}
        >

          <h3>Write a Review</h3>

          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
          >

            <option value={5}>★★★★★</option>

            <option value={4}>★★★★☆</option>

            <option value={3}>★★★☆☆</option>

            <option value={2}>★★☆☆☆</option>

            <option value={1}>★☆☆☆☆</option>

          </select>

          <textarea
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />

          <button type="submit">
            Submit Review
          </button>

        </form>

      )}

    </section>
  );
}

export default MobileReviewSection;