import "./ReviewSection.css";

function ReviewCard({ review }) {

  const reviewDate = new Date(
    review.createdAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <div className="review-card">

      <div className="review-header">

        <div className="review-avatar">

          {review.user?.name?.charAt(0).toUpperCase() || "U"}

        </div>

        <div className="review-user">

          <h4>
            {review.user?.name || "User"}
          </h4>

          <span className="verified-badge">
            ✔ Verified Buyer
          </span>

        </div>

      </div>

      <div className="review-stars">

        {[1,2,3,4,5].map((star)=>(

          <span
            key={star}
            className={
              star <= review.rating
                ? "star active"
                : "star"
            }
          >
            ★
          </span>

        ))}

      </div>

      <p className="review-text">
        {review.comment}
      </p>

      <span className="review-date">
        {reviewDate}
      </span>

    </div>

  );

}

export default ReviewCard;