import { useRef, useState , useContext } from "react";
import "./MobileProductGallery.css";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";

function MobileProductGallery({
    product,
    images,
    handleShare,
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [showViewer, setShowViewer] = useState(false);
  const { toggle, isWishlisted } = useWishlist();

const liked = isWishlisted(product._id);

const handleSwipe = () => {

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {

        if (selectedImage < images.length - 1) {

            setSelectedImage(selectedImage + 1);

        }

    }

    if (distance < -50) {

        if (selectedImage > 0) {

            setSelectedImage(selectedImage - 1);

        }

    }

};

  if (!images.length) return null;

  return (
    <div className="mpg-container">

      {/* Main Image */}
      <div
    className="mpg-main-image"

    onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0].clientX;
    }}

    onTouchEnd={(e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        handleSwipe();
    }}
>

        <img
            src={images[selectedImage]}
            alt="Product"
            onClick={() => setShowViewer(true)}
        />


       <div className="mpg-actions">

    <button
        className="mpg-share"
        onClick={(e) => {
            e.stopPropagation();
            if (handleShare) {
                handleShare();
            }
        }}
    >
        <FaShareAlt />
    </button>

    <button
        className={`mpg-wishlist ${liked ? "liked" : ""}`}
        onClick={(e)=>{
            e.stopPropagation();
            toggle(product._id);
        }}
    >
        {liked ? <FaHeart /> : <FaRegHeart />}
    </button>

</div>

      </div>

      {/* Dots */}

      <div className="mpg-dots">

        {images.map((_, index) => (

          <span
            key={index}
            className={`mpg-dot ${
              selectedImage === index ? "active" : ""
            }`}
          />

        ))}

      </div>

      {/* Thumbnail Row */}

      <div className="mpg-thumbnails">

        {images.map((image, index) => (

          <div
            key={index}
            className={`mpg-thumb ${
              selectedImage === index ? "active" : ""
            }`}
            onClick={() => setSelectedImage(index)}
          >

            <img
              src={image}
              alt={`thumb-${index}`}
            />

          </div>

        ))}

      </div>

      {showViewer && (

<div
    className="mpg-viewer"
    onClick={() => setShowViewer(false)}
>

  <button
  className="mpg-nav mpg-prev"
  onClick={(e) => {
    e.stopPropagation();

    setSelectedImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }}
>
  ❮
</button>

    <img
        src={images[selectedImage]}
        alt="Product"
        className="mpg-viewer-image"
    />

    <button
  className="mpg-nav mpg-next"
  onClick={(e) => {
    e.stopPropagation();

    setSelectedImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }}
>
  ❯
</button>

    <button
        className="mpg-close"
        onClick={() => setShowViewer(false)}
    >
        ✕
    </button>

    <div className="mpg-counter">
  {selectedImage + 1} / {images.length}
</div>

</div>

)}

    </div>
  );
}

export default MobileProductGallery;