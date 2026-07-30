import { useState } from "react";
import "./ProductGallery.css";

function ProductGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState({});

  const handleMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center center",
    });
  };

  return (
    <div className="gallery">

      <div className="gallery-thumbnails">
        {images.map((img, index) => (
          <div
            key={index}
            className={`gallery-thumb ${
              selectedImage === img ? "active" : ""
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <img src={img} alt="" />
          </div>
        ))}
      </div>

      <div
        className="gallery-main"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <img
          src={selectedImage}
          alt=""
          style={zoomStyle}
        />
      </div>

    </div>
  );
}

export default ProductGallery;