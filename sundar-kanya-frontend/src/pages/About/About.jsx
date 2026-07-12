import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">

      <section className="about-hero">
        <div className="about-overlay">
          <h1>Designed with Passion.</h1>

          <p>
            Elegant handcrafted jewellery that celebrates every woman's beauty.
          </p>

          <Link to="/products" className="about-btn">
            Shop Collection
          </Link>
        </div>
      </section>

      <section className="about-container">

        <div className="about-story">
          <h2>🌸 Our Story</h2>

          <p>
            Sundar Kanya was created with one vision—to make elegant jewellery
            accessible to every woman. Every piece is carefully selected to
            combine timeless beauty with modern fashion.
          </p>

          <p>
            Whether it's earrings, pendants or bracelets, our collections are
            designed to add confidence, elegance and happiness to your everyday
            style.
          </p>
        </div>

        <h2 className="section-heading">
          Why Choose Sundar Kanya?
        </h2>

        <div className="features">

          <div className="feature-card">
            <div className="icon">💎</div>
            <h3>Premium Quality</h3>
            <p>
              Carefully selected jewellery with excellent craftsmanship.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">💖</div>
            <h3>Affordable Luxury</h3>
            <p>
              Luxury-inspired designs without luxury prices.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🌿</div>
            <h3>Minimal & Elegant</h3>
            <p>
              Jewellery designed for every occasion and every outfit.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🇮🇳</div>
            <h3>Made with Love</h3>
            <p>
              Supporting Indian creativity and craftsmanship.
            </p>
          </div>

        </div>

        <div className="promise">

          <h2>❤️ Our Promise</h2>

          <p>
            We believe jewellery is more than an accessory—it is an expression
            of confidence, personality and beauty. Every order is packed with
            care and delivered with love.
          </p>

        </div>

        <div className="trust-grid">

          <div className="trust-card">
            🚚
            <h4>Free Shipping</h4>
          </div>

          <div className="trust-card">
            🔒
            <h4>Secure Payment</h4>
          </div>

          <div className="trust-card">
            🔄
            <h4>Easy Returns</h4>
          </div>

          <div className="trust-card">
            💬
            <h4>24×7 Support</h4>
          </div>

        </div>

        <div className="about-footer">

          <h2>Sundar Kanya</h2>

          <p>Because beauty begins with being you.</p>

          <Link to="/products" className="about-btn">
            Explore Collection
          </Link>

        </div>

      </section>

    </div>
  );
};

export default About;