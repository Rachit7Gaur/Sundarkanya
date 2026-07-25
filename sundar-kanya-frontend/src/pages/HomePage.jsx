import HeroSlider from "../components/HeroSlider/HeroSlider";
import Categories from "../components/Home/ShopByCategory";
import FeaturedProducts from "../components/Home/FeaturedProducts/FeaturedProducts";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import Testimonials from "../components/Testimonials/Testimonials";
import Newsletter from "../components/Newsletter/Newsletter";

function HomePage() {
  return (
    <>
      <HeroSlider />
      <Categories />
      <FeaturedProducts />
      <WhyChoose />
      <Testimonials />
      <Newsletter />
    </>
  );
}

export default HomePage;