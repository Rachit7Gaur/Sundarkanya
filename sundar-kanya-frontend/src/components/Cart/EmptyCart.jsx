import { Link } from "react-router-dom";
import "./EmptyCart.css";

const EmptyCart = () => {
  return (
    <div className="empty-cart">

      <div className="empty-icon">
        🛒
      </div>

      <h2>Your Cart is Empty</h2>

      <p>
        Looks like you haven't added anything to your cart yet.
      </p>

      <Link to="/products" className="continue-btn">
        Continue Shopping
      </Link>

    </div>
  );
};

export default EmptyCart;