import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import "./ReviewSection.css";

function ReviewSection({
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

    <section className="review-section">

      <div className="review-section-heading">

        <h2>Customer Reviews</h2>

        <p>
          Real experiences shared by our valued customers.
        </p>

      </div>

      <div className="review-layout">

        {/* Left Side */}

        <div className="review-left">

          <ReviewSummary
            reviews={reviews}
            averageRating={averageRating}
            totalReviews={totalReviews}
          />

          <ReviewForm
            user={user}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            handleReviewSubmit={handleReviewSubmit}
          />

        </div>

        {/* Right Side */}

        <div className="review-right">

          <ReviewList
            reviews={reviews}
          />

        </div>

      </div>

    </section>

  );

}

export default ReviewSection;