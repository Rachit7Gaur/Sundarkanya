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
const [showModal, setShowModal] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggle, isWishlisted } = useWishlist();

  useEffect(() => {
    if (images.length > 0) {
  setSelectedImage(images[0]);
  setCurrentIndex(0);
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

  const openModal = () => {
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
};

const nextImage = () => {
  const next = (currentIndex + 1) % images.length;
  setCurrentIndex(next);
  setSelectedImage(images[next]);
};

const prevImage = () => {
  const prev =
    (currentIndex - 1 + images.length) % images.length;

  setCurrentIndex(prev);
  setSelectedImage(images[prev]);
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
          onClick={openModal}
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

      {showModal && (
<div
  className="image-modal"
  onClick={closeModal}
>
<button
  className="close-modal"
  onClick={(e) => {
    e.stopPropagation();
    closeModal();
  }}
>
  ✕
</button>

    {images.length > 1 && (
<button
  className="modal-prev"
  onClick={(e) => {
    e.stopPropagation();
    prevImage();
  }}
>
  ❮
</button>
    )}

<img
  src={selectedImage}
  alt="Product"
  className="modal-image"
  onClick={(e) => e.stopPropagation()}
/>

    {images.length > 1 && (
<button
  className="modal-next"
  onClick={(e) => {
    e.stopPropagation();
    nextImage();
  }}
>
  ❯
</button>
    )}

  </div>
)}
    </div>
  );
};

export default ProductGallery;