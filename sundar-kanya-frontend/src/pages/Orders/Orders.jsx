import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import "./Orders.css";

import Loader from "../../components/Loader/Loader";
import { getOrders } from "../../services/orderService";


const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchOrders();
  }, []);


  const fetchOrders = async () => {

    try {

      const data = await getOrders();

      setOrders(data);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to load orders"
      );

    } finally {

      setLoading(false);

    }

  };


  if (loading) {
    return <Loader />;
  }


  return (

    <div className="orders-page">

      <h1 className="orders-title">
        My Orders
      </h1>


      {
        orders.length === 0 ? (

          <div className="no-orders">

            <h2>
              No Orders Yet
            </h2>

            <p>
              Your placed orders will appear here.
            </p>

          </div>

        ) : (


          <div className="orders-container">

            {
              orders.map((order) => (

                <div
                  className="order-card"
                  key={order._id}
                >


                  <div className="order-top">

                    <div>
                      <h3>
                        Order ID
                      </h3>

                      <p>
                        {order._id}
                      </p>
                    </div>


                    <div className="status-box">

                      <span>
                        {order.orderStatus}
                      </span>

                    </div>


                  </div>



                  <div className="order-details">


                    <p>
                      Payment Status:
                      <strong>
                        {order.paymentStatus}
                      </strong>
                    </p>


                    <p>
                      Payment Method:
                      <strong>
                        {order.paymentMethod}
                      </strong>
                    </p>


                    <p>
                      Total Amount:
                      <strong>
                        ₹{order.totalAmount}
                      </strong>
                    </p>


                  </div>



                  <h3 className="products-heading">
                    Products
                  </h3>



                  <div className="order-products">

                    {
                      order.items.map((item) => (

                        <div
                          className="order-product"
                          key={item._id}
                        >

                          <img
                            src={
                              item.product?.images?.length
                              ?
                              item.product.images[0]
                              :
                              "https://via.placeholder.com/100"
                            }
                            alt={
                              item.product?.name ||
                              "Product"
                            }
                          />


                          <div>

                            <h4>
                              {
                                item.product?.name
                                ||
                                "Product unavailable"
                              }
                            </h4>


                            <p>
                              Quantity: {item.quantity}
                            </p>


                            <p>
                              Price: ₹{item.price}
                            </p>


                          </div>


                        </div>

                      ))
                    }

                  </div>


                </div>

              ))
            }

          </div>

        )
      }


    </div>

  );

};


export default Orders;