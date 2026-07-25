import { useNavigate } from "react-router-dom";
import "./CartSummary.css";
import formatCurrency from "../../utils/formatCurrency";

function CartSummary({ items }) {

  const navigate = useNavigate();

  const totalProducts = items.length;

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const shipping = 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const freeShippingTarget = 999;
  const remaining =
    freeShippingTarget - subtotal;

  return (

    <aside className="cart-summary-card">

      <h2>
        Order Summary
      </h2>

      {subtotal < freeShippingTarget && (

        <div className="shipping-progress">

          <p>

            Add
            <strong>
              {" "}
              {formatCurrency(remaining)}
            </strong>
            {" "}more for FREE shipping

          </p>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${Math.min(
                  (subtotal / freeShippingTarget) * 100,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

      )}

      <div className="coupon-box">

        <input
          type="text"
          placeholder="Promo Code"
        />

        <button>

          Apply

        </button>

      </div>

      <div className="summary-row">

        <span>
          Products
        </span>

        <span>
          {totalProducts}
        </span>

      </div>

      <div className="summary-row">

        <span>
          Quantity
        </span>

        <span>
          {totalQuantity}
        </span>

      </div>

      <div className="summary-row">

        <span>
          Subtotal
        </span>

        <span>
          {formatCurrency(subtotal)}
        </span>

      </div>

      <div className="summary-row">

        <span>
          Shipping
        </span>

        <span>

          FREE

        </span>

      </div>

      <div className="summary-row">

        <span>
          Discount
        </span>

        <span>

          {formatCurrency(discount)}

        </span>

      </div>

      <hr />

      <div className="summary-total">

        <span>

          Total

        </span>

        <span>

          {formatCurrency(total)}

        </span>

      </div>

      <div className="delivery-box">

        🚚 Estimated Delivery:
        <strong> 3–5 Business Days</strong>

      </div>

      <div className="summary-features">

        <p>🔒 Secure Payment</p>

        <p>💎 Premium Jewellery</p>

        <p>↩ Easy Returns</p>

      </div>

      <button
        className="checkout-button"
        onClick={() =>
          navigate("/checkout")
        }
      >

        Proceed To Checkout

      </button>

    </aside>

  );

}

export default CartSummary;