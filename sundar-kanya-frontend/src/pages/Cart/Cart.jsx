import { useContext } from "react";
import "./Cart.css";

import { CartContext } from "../../context/CartContext";

import Loader from "../../components/Loader/Loader";
import CartItem from "../../components/Cart/CartItem";
import CartSummary from "../../components/Cart/CartSummary";
import EmptyCart from "../../components/Cart/EmptyCart";
import PageLayout from "../../components/Layout/PageLayout";

function Cart() {
  const {
    cart,
    loading,
    removeFromCart,
    updateQuantity,
  } = useContext(CartContext);

  const items = cart?.items || [];

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
  };

  const handleUpdate = async (productId, quantity) => {
    await updateQuantity(productId, quantity);
  };

  if (loading) {
    return <Loader />;
  }

return (
   <PageLayout>

    <div className="cart-page">

      {/* Header */}

      <div className="cart-header">

        <p className="cart-breadcrumb">
          Home / Shopping Bag
        </p>

        <h1>
          Shopping Bag
        </h1>

      </div>

      <div className="container">

        {items.length === 0 ? (

          <EmptyCart />

        ) : (

          <>
            {/* Top */}

            <div className="cart-top">

              <h2>
                Your Cart
              </h2>

              <span>
                {items.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}{" "}
                Item
                {items.reduce(
                  (total, item) => total + item.quantity,
                  0
                ) > 1
                  ? "s"
                  : ""}
              </span>

            </div>

            {/* Layout */}

            <div className="cart-layout">

              <div className="cart-items">

                {items.map((item) => (

                  <CartItem
                    key={item.product._id}
                    item={item}
                    onRemove={handleRemove}
                    onUpdate={handleUpdate}
                  />

                ))}

              </div>

              <CartSummary
                items={items}
              />

            </div>

          </>

        )}

      </div>
      </div>
    </PageLayout>
  );
}

export default Cart;