import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./Checkout.css";

import PageLayout from "../../components/Layout/PageLayout";
import PaymentButton from "../../components/Payment/PaymentButton";

import { placeOrder } from "../../services/orderService";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {

    const navigate = useNavigate();

    const { cart, cartSubtotal } = useContext(CartContext);

    const [loading, setLoading] = useState(false);

    const [paymentData, setPaymentData] = useState(null);

    const [formData, setFormData] = useState({

        fullName: "",

        phone: "",

        address: "",

        city: "",

        state: "",

        pincode: "",

        paymentMethod: "COD",

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

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

        if (formData.paymentMethod === "COD") {

            try {

                setLoading(true);

                const response = await placeOrder(data);

                toast.success("Order placed successfully");

                navigate(`/order-confirmation/${response.order._id}`);

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Order Failed"

                );

            }

            finally {

                setLoading(false);

            }

            return;

        }

        setPaymentData(data);

    };

    return (

        <PageLayout>

            <div className="checkout-page">

                <section className="checkout-hero">

                    <p className="checkout-subtitle">

                        SECURE CHECKOUT

                    </p>

                    <h1>

                        Complete Your Purchase

                    </h1>

                    <p className="checkout-description">

                        Experience luxury shopping with secure payment,
                        trusted delivery and handcrafted jewellery.

                    </p>

                </section>

                <div className="checkout-container">

                    {
                        !paymentData ? (

                            <div className="checkout-layout">

                                <div className="checkout-card">

                                    <div className="card-header">

                                        <h2>

                                            Billing Details

                                        </h2>

                                        <p>

                                            Please enter your shipping details.

                                        </p>

                                    </div><form
    className="checkout-form"
    onSubmit={handleSubmit}
>

    <div className="input-group">

        <label>Full Name</label>

        <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
        />

    </div>

    <div className="input-group">

        <label>Phone Number</label>

        <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
        />

    </div>

    <div className="input-group">

        <label>Address</label>

        <textarea
            name="address"
            placeholder="House No., Street, Landmark..."
            value={formData.address}
            onChange={handleChange}
            required
        />

    </div>

    <div className="form-grid">

        <div className="input-group">

            <label>City</label>

            <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
            />

        </div>

        <div className="input-group">

            <label>State</label>

            <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
            />

        </div>

    </div>

    <div className="input-group">

        <label>Pincode</label>

        <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
        />

    </div>

    <div className="input-group">

        <label>Payment Method</label>

        <select
            className="payment-select"
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
                Debit / Credit Card
            </option>

            <option value="Net Banking">
                Net Banking
            </option>

        </select>

    </div>

    <button
        className="checkout-btn"
        disabled={loading}
    >
        {loading
            ? "Processing..."
            : "Continue to Secure Payment"}
    </button>

</form>

</div>

<div className="summary-card">

    <h2>Order Summary</h2>

    <div className="summary-products">

        {cart.items.length > 0 ? (

            cart.items.map((item) => (

                <div
                    className="summary-product"
                    key={item.product._id}
                >

                    <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                    />

                    <div className="summary-product-info">

                        <h4>
                            {item.product.name}
                        </h4>

                        <p>
                            Qty : {item.quantity}
                        </p>

                    </div>

                    <span className="summary-price">

                        ₹
                        {item.product.price *
                            item.quantity}

                    </span>

                </div>

            ))

        ) : (

            <p className="empty-cart">

                No products in cart

            </p>

        )}

    </div>

    <div className="summary-divider"></div>

    <div className="summary-row">

        <span>Subtotal</span>

        <span>

            ₹{cartSubtotal}

        </span>

    </div>

    <div className="summary-row">

        <span>Shipping</span>

        <span className="free">

            FREE

        </span>

    </div>

    <div className="summary-row total">

        <span>Total</span>

        <span>

            ₹{cartSubtotal}

        </span>

    </div>

    <div className="summary-divider"></div>

    <div className="summary-trust">

        <div>

            🔒 Secure Payments

        </div>

        {/* <div>

            💎 BIS Hallmarked Jewellery

        </div> */}

        <div>

            🚚 Free Shipping

        </div>

        <div>

            ↩ Easy Returns

        </div>

    </div>

</div>

</div>

) : (


<div className="luxury-payment-layout">

    {/* LEFT SIDE */}

    <div className="luxury-payment-summary">

        <h2 className="luxury-payment-title">
            Order Summary
        </h2>

        <div className="luxury-divider"></div>

        <div className="luxury-row">
            <span>Subtotal</span>
            <span>₹{cartSubtotal}</span>
        </div>

        <div className="luxury-row">
            <span>Shipping</span>
            <span className="luxury-free">
                FREE
            </span>
        </div>

        <div className="luxury-divider"></div>

        <div className="luxury-row luxury-total-row">

            <span>Total</span>

            <span>₹{cartSubtotal}</span>

        </div>

        <div className="luxury-features">

            <div className="luxury-feature">
                🔒 100% Secure Checkout
            </div>

            <div className="luxury-feature">
                💳 Razorpay Protected
            </div>

            <div className="luxury-feature">
                🚚 Free Shipping Across India
            </div>

            {/* <div className="luxury-feature">
                💎 BIS Hallmarked Jewellery
            </div> */}

            <div className="luxury-feature">
                ↩ Easy Return Policy
            </div>

        </div>

    </div>

    {/* RIGHT SIDE */}

    <div className="luxury-payment-card">

        <span className="luxury-payment-tag">
            SECURE PAYMENT
        </span>

        <h1 className="luxury-payment-heading">

            Complete Your Payment

        </h1>

        <p className="luxury-payment-text">

            Your payment is protected by
            industry-standard encryption through
            Razorpay. Shop confidently with
            Sundar Kanya.

        </p>

        <div className="luxury-payment-button-wrapper">

    <div className="luxury-payment-button">

        <PaymentButton clasName="payment-btn"
            paymentData={paymentData}
        />

    </div>

</div>

        <div className="luxury-payment-security">

            <div className="luxury-security-item">
                🔒 SSL Encrypted
            </div>

            <div className="luxury-security-item">
                💳 Razorpay Secure
            </div>

            <div className="luxury-security-item">
                🛡 Safe Checkout
            </div>

        </div>

    </div>

</div>


)

}

</div>

</div>

</PageLayout>

);

};

export default Checkout;