import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./PaymentButton.css";

import {
  createPaymentOrder,
  verifyPayment
} from "../../services/paymentService";


const PaymentButton = ({ paymentData }) => {

  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();


  const handlePayment = async()=>{

    try{

      setLoading(true);


      // Create Razorpay order
const razorpayOrder = await createPaymentOrder({
  paymentMethod: paymentData.paymentMethod,
});


const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,

amount: razorpayOrder.amount,
currency: razorpayOrder.currency,
order_id: razorpayOrder.id,

  name: "Sundarkanya",
  description: "Premium Jewellery Collection",

  image: "/logo.jpeg",   // Put your logo inside public/logo.png


handler: async function (response) {

  const result = await verifyPayment({
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature,
    shippingAddress: paymentData.shippingAddress,
    paymentMethod: paymentData.paymentMethod,
  });

  console.log("Verify Result:", result);

  if (result.success) {
    toast.success("Payment Successful");
    navigate(`/order-confirmation/${result.order._id}`);
  } else {
    toast.error(result.message);
  }
},

  prefill: {
    name: paymentData.shippingAddress.fullName,
    contact: paymentData.shippingAddress.phone,
  },

  notes: {
    address:
      `${paymentData.shippingAddress.address},
       ${paymentData.shippingAddress.city},
       ${paymentData.shippingAddress.state}`,
  },

  theme: {
    color: "#d63384",
  },

  modal: {
    ondismiss: function () {
      toast("Payment cancelled");
    },
  },
};


   
    if (!window.Razorpay) {
  toast.error("Razorpay SDK not loaded");
  return;
}


      const razorpay =
      new window.Razorpay(options);


      razorpay.open();



    }catch (error) {
  console.log("Verify Error:", error.response?.data);
  toast.error(error.response?.data?.message || "Payment failed");
}finally{

      setLoading(false);

    }

  };



  return (

    <button

      className="payment-btn"

      onClick={handlePayment}

      disabled={loading}

    >

      {
        loading
        ?
        "Processing..."
        :
        "Pay Now"

      }

    </button>

  );

};


export default PaymentButton;