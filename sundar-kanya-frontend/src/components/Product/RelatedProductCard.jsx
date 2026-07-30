import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./RelatedProductCard.css";

function RelatedProductCard({ product }) {

  const navigate = useNavigate();

  return (

    <div
      className="rp-card"
      onClick={() => navigate(`/products/${product._id}`)}
    >

      <div className="rp-image">

        <img
          src={
            product.images?.length
              ? product.images[0]
              : "/placeholder.jpg"
          }
          alt={product.name}
        />

      </div>

      <div className="rp-content">

        <span className="rp-category">
          {product.category}
        </span>

        <h3 className="rp-title">
          {product.name}
        </h3>

        <div className="rp-rating">

          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />

        </div>

        <div className="rp-price">

          ₹{product.price}

        </div>

      </div>

    </div>

  );

}

export default RelatedProductCard;