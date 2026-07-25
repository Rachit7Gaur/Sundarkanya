import "./About.css";
import { Link } from "react-router-dom";
import {
  FiAward,
  FiHeart,
  FiGift,
  FiTruck,
  FiCheckCircle,
  FiPackage,
} from "react-icons/fi";

function About() {
  return (
    <div className="about-page">

      {/* HERO */}

      <section className="about-hero">

        <div className="about-overlay">

          <span className="section-tag">
            Since 2023
          </span>

          <h1>
            Jewellery Crafted
            <br />
            For Every Beautiful Moment
          </h1>

          <p>
            Timeless earrings, pendants and bracelets
            designed to celebrate elegance,
            confidence and femininity.
          </p>

          <Link
            to="/products"
            className="about-btn"
          >
            Explore Collection
          </Link>

        </div>

      </section>

      {/* STORY */}

      <section className="about-story">

        <div className="about-story-image">

          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800"
            alt="Sundar Kanya"
          />

        </div>

        <div className="about-story-content">

          <span className="section-tag">
            Our Story
          </span>

          <h2>
            Beauty Begins
            With Simplicity.
          </h2>

          <p>
            Sundar Kanya was born with one vision—
            to create elegant jewellery that every
            woman can wear with confidence.
          </p>

          <p>
            Every collection is carefully selected
            to combine timeless beauty with modern
            fashion while remaining affordable.
          </p>

          <p>
            We believe jewellery should never feel
            ordinary. It should become part of your
            personality.
          </p>

        </div>

      </section>

      {/* VALUES */}

      <section className="about-values">

        <div className="section-heading">

          <span className="section-tag">
            Our Values
          </span>

          <h2>
            Why Women Love
            Sundar Kanya
          </h2>

        </div>

        <div className="values-grid">

          <div className="value-card">

            <div className="value-icon">
              <FiAward />
            </div>

            <h3>Premium Quality</h3>

            <p>
              Carefully selected jewellery crafted
              with attention to every detail.
            </p>

          </div>

          <div className="value-card">

            <div className="value-icon">
              <FiHeart />
            </div>

            <h3>Made With Love</h3>

            <p>
              Every order is packed carefully to
              make your experience memorable.
            </p>

          </div>

          <div className="value-card">

            <div className="value-icon">
              <FiGift />
            </div>

            <h3>Perfect Gifts</h3>

            <p>
              Beautiful pieces for birthdays,
              anniversaries and every celebration.
            </p>

          </div>

          <div className="value-card">

            <div className="value-icon">
              <FiTruck />
            </div>

            <h3>Fast Delivery</h3>

            <p>
              Reliable shipping with secure
              packaging across India.
            </p>

          </div>

        </div>

      </section>

      {/* PROCESS */}

      <section className="craft-section">

        <div className="section-heading">

          <span className="section-tag">
            Craftsmanship
          </span>

          <h2>
            From Design To Delivery
          </h2>

        </div>

        <div className="craft-grid">

          <div className="craft-card">

            <FiCheckCircle />

            <h3>Design</h3>

            <p>
              Inspired by timeless elegance and
              modern fashion trends.
            </p>

          </div>

          <div className="craft-card">

            <FiPackage />

            <h3>Packaging</h3>

            <p>
              Packed beautifully so every order
              feels like a luxury gift.
            </p>

          </div>

          <div className="craft-card">

            <FiTruck />

            <h3>Delivery</h3>

            <p>
              Fast, safe and secure delivery
              directly to your doorstep.
            </p>

          </div>

        </div>

      </section>

      {/* PROMISE */}

      <section className="about-promise">

        <span className="section-tag">
          Our Promise
        </span>

        <h2>
          More Than Jewellery
        </h2>

        <p>
          Every piece we deliver represents trust,
          elegance and confidence. Our goal is not
          just to sell jewellery but to become a
          part of your most beautiful memories.
        </p>

        <Link
          to="/products"
          className="about-btn"
        >
          Shop Now
        </Link>

      </section>

    </div>
  );
}

export default About;