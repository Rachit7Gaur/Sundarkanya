import "./CartItem.css";
import { FiTrash2 } from "react-icons/fi";
import formatCurrency from "../../utils/formatCurrency";

function CartItem({
  item,
  onRemove,
  onUpdate,
}) {
  const product = item.product;

  return (
    <div className="cart-card">

      <div className="cart-card-image">

        <img
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/300"
          }
          alt={product.name}
        />

      </div>

      <div className="cart-card-content">

        <span className="cart-card-category">
          {product.category}
        </span>

        <h3 className="cart-card-title">
          {product.name}
        </h3>

        <p className="cart-card-price">
          {formatCurrency(product.price)}
        </p>

        <span
          className={
            product.stock > 0
              ? "cart-card-stock in"
              : "cart-card-stock out"
          }
        >
          {product.stock > 0
            ? "In Stock"
            : "Out Of Stock"}
        </span>

        <div className="cart-card-bottom">

          <div className="cart-quantity">

            <button
              onClick={() =>
                onUpdate(
                  product._id,
                  item.quantity - 1
                )
              }
              disabled={item.quantity <= 1}
            >
              −
            </button>

            <span>
              {item.quantity}
            </span>

            <button
              onClick={() =>
                onUpdate(
                  product._id,
                  item.quantity + 1
                )
              }
            >
              +
            </button>

          </div>

          <div className="cart-subtotal">

            {formatCurrency(
              product.price * item.quantity
            )}

          </div>

        </div>

        <button
          className="cart-remove"
          onClick={() =>
            onRemove(product._id)
          }
        >

          <FiTrash2 />

          Remove

        </button>

      </div>

    </div>
  );
}

export default CartItem;