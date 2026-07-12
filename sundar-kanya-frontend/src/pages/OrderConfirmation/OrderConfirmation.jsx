import { Link, useParams } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {

  const { id } = useParams();


  return (

    <div className="confirmation-page">

      <div className="confirmation-card">


        <div className="success-icon">
          ✓
        </div>


        <h1>
          Order Placed Successfully!
        </h1>


        <p>
          Thank you for shopping with SundarKanya.
        </p>


        <p className="order-id">
          Order ID:
          <strong>
            {id}
          </strong>
        </p>


        <div className="confirmation-buttons">


          <Link
            to="/products"
            className="shop-btn"
          >
            Continue Shopping
          </Link>



          <Link
            to="/profile"
            className="orders-btn"
          >
            View Profile
          </Link>


        </div>


      </div>


    </div>

  );
};


export default OrderConfirmation;