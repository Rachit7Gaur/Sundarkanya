import "./ReviewSection.css";

function ReviewSummary({ averageRating, totalReviews, reviews }) {
  const ratingCount = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    ratingCount[review.rating]++;
  });

  return (
    <div className="review-summary">

      <h2 className="summary-rating">
        {averageRating.toFixed(1)}
      </h2>

      <div className="summary-stars">
        ★★★★★
      </div>

      <p className="summary-total">
        Based on {totalReviews} Reviews
      </p>

      <div className="rating-bars">

        {[5,4,3,2,1].map((star) => (

          <div
            className="rating-row"
            key={star}
          >

            <span>{star} ★</span>

            <div className="rating-progress">

              <div
                className="rating-fill"
                style={{
                  width:
                    totalReviews === 0
                      ? "0%"
                      : `${
                          (ratingCount[star] /
                            totalReviews) *
                          100
                        }%`,
                }}
              />

            </div>

            <span>
              {ratingCount[star]}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ReviewSummary;