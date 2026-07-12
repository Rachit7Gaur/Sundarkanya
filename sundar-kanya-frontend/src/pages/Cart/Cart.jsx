import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import "./Cart.css";

import Loader from "../../components/Loader/Loader";
import CartItem from "../../components/Cart/CartItem";
import CartSummary from "../../components/Cart/CartSummary";
import EmptyCart from "../../components/Cart/EmptyCart";

import { getCart, removeFromCart , updateCartQuantity} from "../../services/cartService";


const Cart = () => {

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetchCart();

  }, []);



  const fetchCart = async () => {

    try {

      setLoading(true);

      const data = await getCart();

      setCart(data);

    } catch(error){

      console.log(error);

      toast.error("Unable to load cart");

    } finally {

      setLoading(false);

    }

  };



  const handleRemove = async(productId)=>{

    try{

      await removeFromCart(productId);

      toast.success("Product removed");

      fetchCart();

    }catch(error){

      toast.error(
        error.response?.data?.message ||
        "Unable to remove product"
      );

    }

  };

  const handleUpdate = async(productId, quantity)=>{

      try{

        await updateCartQuantity(
          productId,
          quantity
        );

        fetchCart();

      }catch(error){

        toast.error("Unable to update quantity");

      }

      };



  if(loading){

    return <Loader />;

  }



  const items = cart?.items || [];



  return (

    <div className="cart-page">

      <div className="container">


        <h1 className="cart-title">
          Shopping Cart
        </h1>


        {
          items.length === 0 ? (

            <EmptyCart />

          ) : (

            <div className="cart-layout">


              <div className="cart-items">

                {
                  items.map((item)=>(
                    
                    <CartItem

                      key={item.product._id}

                      item={item}

                      onRemove={handleRemove}

                      onUpdate={handleUpdate}

                    />

                  ))
                }

              </div>



              <CartSummary

                items={items}

              />


            </div>

          )
        }


      </div>

    </div>

  );

};


export default Cart;