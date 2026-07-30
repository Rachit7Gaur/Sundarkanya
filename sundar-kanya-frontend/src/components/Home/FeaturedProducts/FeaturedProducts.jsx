import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { getProducts } from "../../../services/productService";
import ProductCard from "../../Product/ProductCard";

import "./FeaturedProducts.css";

function FeaturedCollection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        if (Array.isArray(data)) {
          setProducts(data.slice(0, 8));
        } else if (Array.isArray(data?.products)) {
          setProducts(data.products.slice(0, 8));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
   <section className="featured-section">

  <div className="section-title">
    <p>HANDPICKED FOR YOU</p>
    <h2>Featured Collection</h2>
  </div>

  {/* Desktop + Tablet Grid */}
  <div className="featured-grid">
    {products.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
      />
    ))}
  </div>

  {/* Mobile Slider */}
  <div className="featured-mobile-slider">

    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1.15}
      centeredSlides={true}
      spaceBetween={18}
      loop={products.length > 4}
      autoplay={{
        delay:3000,
        disableOnInteraction:false
      }}
      pagination={{
        clickable:true
      }}
      className="featured-swiper"
    >

      {products.map((product)=>(
        <SwiperSlide key={product._id}>
          <ProductCard product={product}/>
        </SwiperSlide>
      ))}

    </Swiper>

  </div>

</section>
  );
}

export default FeaturedCollection;