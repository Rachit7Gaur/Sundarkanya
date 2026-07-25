import Button from "../Button/Button";

function ReviewSection({
  user,
  reviews,
  totalReviews,
  averageRating,
  rating,
  setRating,
  comment,
  setComment,
  handleReviewSubmit,
}) {
  return (
    <>

      <section className="pd-review-section">

        <div className="pd-review-header">

          <h2>
            Customer Reviews
          </h2>

          <p>
            {totalReviews} Reviews • ⭐ {Number(averageRating).toFixed(1)}
          </p>

        </div>

        {reviews.length === 0 ? (

          <div className="pd-empty-review">

            <div className="pd-empty-icon">
              💬
            </div>

            <h3>
              No Reviews Yet
            </h3>

            <p>
              Be the first customer to review this jewellery.
            </p>

          </div>

        ) : (

          <div className="pd-review-grid">

            {reviews.map((review) => (

              <div
                key={review._id}
                className="pd-review-card"
              >

                <div className="pd-review-top">

                  <div>

                    <h4>
                      {review.user?.name || "Anonymous"}
                    </h4>

                    <span>
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  <div className="pd-review-stars">

                    {"⭐".repeat(review.rating)}

                  </div>

                </div>

                <p>
                  {review.comment}
                </p>

              </div>

            ))}

          </div>

        )}

      </section>

      {!user ? (

        <div className="pd-login-review">

          Please login to write a review.

        </div>

      ) : (

        <form
          className="pd-review-form"
          onSubmit={handleReviewSubmit}
        >

          <h2>

            Write Your Review

          </h2>

          <div className="pd-form-group">

            <label>

              Rating

            </label>

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

          </div>

          <div className="pd-form-group">

            <label>

              Your Experience

            </label>

            <textarea
              placeholder="Tell other customers about this jewellery..."
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              required
            />

          </div>

          <Button
            type="submit"
            className="pd-submit-review"
          >

            Submit Review

          </Button>

        </form>

      )}

    </>
  );
}

export default ReviewSection;