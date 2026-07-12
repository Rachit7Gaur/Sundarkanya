import "./Hero.css";
import heroImage from "../../assets/images/hero.jpeg";
import { Link } from "react-router-dom";

function Hero() {
  return (
<section className="hero">
  <div className="hero-content">
    <span className="hero-tag">
      ✨ Premium Handmade Jewellery
    </span>

    <h1>
      Shine with <span>Sundarkanya</span>
    </h1>

    <p>
      Discover elegant earrings, pendants and bracelets crafted to make every woman shine beautifully.
    </p>

    <div className="hero-buttons">
      <Link to="/products" className="hero-btn primary">
        Shop Now
      </Link>

      <Link to="/products" className="hero-btn secondary">
        Explore Collection
      </Link>
    </div>
  </div>

  <div className="hero-image">
    <div className="circle"></div>

    <img
      src={heroImage}
      alt="Sundarkanya Jewellery"
    />
  </div>
</section>
  );
}

export default Hero;