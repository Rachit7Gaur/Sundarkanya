import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import "./ProductGallery.css";

const ProductGallery = ({
  images = [],
  productId,
}) => {
  const [selectedImage, setSelectedImage] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggle, isWishlisted } = useWishlist();

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleWishlist = () => {
    if (!user) {
      toast.error("Please login to use wishlist");
      navigate("/login");
      return;
    }

    toggle(productId);
  };

  return (
    <div className="gallery">
      <div className="main-image-container">

        <div
          className="wishlist-icon"
          onClick={handleWishlist}
        >
          {isWishlisted(productId) ? "❤️" : "🤍"}
        </div>

        <img
          src={selectedImage || "/placeholder.png"}
          alt="Product"
          className="main-image"
        />
      </div>

      {images.length > 1 && (
        <div className="thumbnail-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index}`}
              className={`thumbnail ${
                selectedImage === image
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedImage(image)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;