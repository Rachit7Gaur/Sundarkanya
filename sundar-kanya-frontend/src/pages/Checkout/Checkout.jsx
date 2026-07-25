import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./Checkout.css";

import { placeOrder } from "../../services/orderService";
import PaymentButton from "../../components/Payment/PaymentButton";
import PageLayout from "../../components/Layout/PageLayout";

const Checkout = () => {

  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState(null);

  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({

    fullName:"",
    phone:"",
    address:"",
    city:"",
    state:"",
    pincode:"",
    paymentMethod:"COD"

  });



  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };



const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    shippingAddress: {
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    },
    paymentMethod: formData.paymentMethod,
  };

  // Cash on Delivery
  if (formData.paymentMethod === "COD") {
    try {
      setLoading(true);

      console.log(data);

      const response = await placeOrder(data);

      toast.success("Order placed successfully");

      navigate(`/order-confirmation/${response.order._id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Order failed"
      );
    } finally {
      setLoading(false);
    }

    return;
  }

  // Online payment
  setPaymentData(data);
};

return (
  <PageLayout>
     <div className="checkout-page">

    <div className="checkout-header">
      <p className="checkout-breadcrumb">
        Home / Checkout
      </p>

      <h1>Checkout</h1>
    </div>

    <div className="checkout-container">

      {!paymentData ? (

        <div className="checkout-layout">

          <div className="checkout-form-card">

            <h2>Shipping Address</h2>

            <form onSubmit={handleSubmit}>

              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <div className="two-column">

                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

                <input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />

              </div>

              <input
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />

              <h3 className="payment-title">
                Payment Method
              </h3>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="COD">
                  Cash On Delivery
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="Card">
                  Card
                </option>

                <option value="Net Banking">
                  Net Banking
                </option>
              </select>

              <button
                className="checkout-btn"
                disabled={loading}
              >
                {loading ? "Processing..." : "Continue"}
              </button>

            </form>

          </div>

          <div className="checkout-info-card">

            <h2>Why Shop With Us?</h2>

            <div className="checkout-feature">
              🔒 100% Secure Payments
            </div>

            <div className="checkout-feature">
              🚚 Free Shipping Across India
            </div>

            <div className="checkout-feature">
              💎 Premium Handcrafted Jewellery
            </div>

            <div className="checkout-feature">
              ↩ Easy Returns
            </div>

          </div>

        </div>

      ) : (

        <div className="payment-section">

          <div className="payment-card">

            <h2>Secure Payment</h2>

            <p>
              Complete your payment securely using Razorpay.
            </p>

            <PaymentButton paymentData={paymentData} />

          </div>

        </div>

      )}

    </div>

  </div>
  </PageLayout>
 
);

};


export default Checkout;