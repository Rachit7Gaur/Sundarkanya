import { FaStar } from "react-icons/fa";
import "./ReviewSection.css";

function ReviewForm({
  user,
  rating,
  setRating,
  comment,
  setComment,
  handleReviewSubmit,
}) {

  if (!user) {

    return (

      <div className="review-login-card">

        <h3>Write a Review</h3>

        <p>
          Please login to share your experience with this jewellery.
        </p>

      </div>

    );

  }

  return (

    <form
      className="review-form"
      onSubmit={handleReviewSubmit}
    >

      <h3>Write Your Review</h3>

      <div className="review-rating">

        {[1,2,3,4,5].map((star)=>(

          <FaStar
            key={star}
            className={
              star <= rating
                ? "review-star active"
                : "review-star"
            }
            onClick={() => setRating(star)}
          />

        ))}

      </div>

      <textarea

        placeholder="Share your experience with this jewellery..."

        value={comment}

        onChange={(e)=>setComment(e.target.value)}

        rows={6}

        required

      />

      <button type="submit">

        Submit Review

      </button>

    </form>

  );

}

export default ReviewForm;