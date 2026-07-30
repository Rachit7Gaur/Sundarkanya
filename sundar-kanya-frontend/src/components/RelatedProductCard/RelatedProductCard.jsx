import { Link } from "react-router-dom";
import "./RelatedProductCard.css";

function RelatedProductCard({ product }) {

  return (

    <Link
      to={`/products/${product._id}`}
      className="rpc-card"
    >

      <img
        src={product.images?.[0]}
        alt={product.name}
        className="rpc-image"
      />

      <div className="rpc-body">

        <span className="rpc-category">
          {product.category}
        </span>

        <h3 className="rpc-title">
          {product.name}
        </h3>

        <p className="rpc-price">
          ₹{product.price}
        </p>

      </div>

    </Link>

  );

}

export default RelatedProductCard;