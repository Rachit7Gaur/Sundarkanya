import ReviewCard from "./ReviewCard";
import "./ReviewSection.css";

function ReviewList({ reviews }) {

  if (reviews.length === 0) {

    return (

      <div className="no-reviews">

        <div className="no-review-icon">
          💎
        </div>

        <h3>No Reviews Yet</h3>

        <p>
          Be the first customer to review this jewellery.
        </p>

      </div>

    );

  }

  return (

    <div className="review-list">

      {reviews.map((review) => (

        <ReviewCard
          key={review._id}
          review={review}
        />

      ))}

    </div>

  );

}

export default ReviewList;