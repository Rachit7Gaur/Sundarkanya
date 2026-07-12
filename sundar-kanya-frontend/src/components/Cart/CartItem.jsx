import "./CartItem.css";
import formatCurrency from "../../utils/formatCurrency";

const CartItem = ({
  item,
  onRemove,
  onUpdate
}) => {

  const product = item.product;

  return (
    <div className="cart-item">

      <img
        src={
          product.images?.length
          ? product.images[0]
          : "https://via.placeholder.com/150"
        }
        alt={product.name}
      />


      <div className="cart-item-info">

        <h3>
          {product.name}
        </h3>


        <p className="cart-price">
          {formatCurrency(product.price)}
        </p>


        <div className="quantity-box">

          <button
          onClick={() =>
            onUpdate(
              product._id,
              item.quantity - 1
            )
          }
          disabled={item.quantity <= 1}
          >
          -
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


        <button
          className="remove-btn"
          onClick={() => onRemove(product._id)}
        >
          Remove
        </button>

      </div>

    </div>
  );
};


export default CartItem;