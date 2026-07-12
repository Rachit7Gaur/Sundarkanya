import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./Checkout.css";

import { placeOrder } from "../../services/orderService";
import PaymentButton from "../../components/Payment/PaymentButton";


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

    <div className="checkout-page">


      <div className="checkout-container">


        <>
  <h1>Checkout</h1>

  {!paymentData && (
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

      <input
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        required
      />

      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
      >
        <option value="COD">Cash On Delivery</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
        <option value="Net Banking">Net Banking</option>
      </select>

      <button disabled={loading}>
        {loading ? "Processing..." : "Continue"}
      </button>

    </form>
  )}

  {paymentData && (
  <div className="payment-section">

    <div className="payment-card">

      <h2>Secure Payment</h2>

      <p>
        Click below to complete your payment securely using Razorpay.
      </p>

      <PaymentButton
        paymentData={paymentData}
      />

    </div>

  </div>
)}
</>


      </div>


    </div>

  );

};


export default Checkout;