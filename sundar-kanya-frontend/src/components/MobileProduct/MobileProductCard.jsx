import "./MobileProductCard.css";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function MobileProductCard({ product }) {

const navigate = useNavigate();

const { addToCart } = useContext(CartContext);

const { toggle, isWishlisted } = useWishlist();

const handleWishlist = (e) => {
    e.stopPropagation();
    toggle(product._id);
};

const handleCart = (e) => {
    e.stopPropagation();
    addToCart(product._id,1);
};

return (

<div
className="mobile-card"
onClick={()=>navigate(`/products/${product._id}`)}
>

<button
className="mobile-wishlist"
onClick={handleWishlist}
>
{isWishlisted(product._id)
?
<FaHeart/>
:
<FiHeart/>
}
</button>

<div className="mobile-image">

<img
src={
product.images?.length
?
product.images[0]
:
"/placeholder.jpg"
}
alt={product.name}
/>

</div>

<div className="mobile-content">

<p className="mobile-category">

{product.category}

</p>

<h3 className="mobile-title">

{product.name}

</h3>

<div className="mobile-rating">

<FaStar/>
<FaStar/>
<FaStar/>
<FaStar/>
<FaStar/>

</div>

<div className="mobile-price">

₹{product.price}

</div>

<button
className="mobile-cart"
onClick={handleCart}
>

Add To Cart

</button>

</div>

</div>

);

}

export default MobileProductCard;