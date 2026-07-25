import "./Footer.css";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiAward,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-brand">

          <h2>
            Sundar <span>Kanya</span>
          </h2>

          <p>
            Elegant jewellery crafted to celebrate
            beauty, confidence and timeless fashion.
            Every piece is designed to make every
            moment special.
          </p>

          <div className="footer-socials">

            {/* <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaFacebookF />
            </a> */}

            <a href="https://pin.it/7GT9tqfpH">
              <FaPinterestP />
            </a>

            {/* <a href="#">
              <FaYoutube />
            </a> */}

          </div>

        </div>

        {/* Shop */}

        <div className="footer-column">

          <h3>Shop</h3>

          <Link to="/products?category=earrings">
            Earrings
          </Link>

          <Link to="/products?category=pendant">
            Pendants
          </Link>

          <Link to="/products?category=bracelet">
            Bracelets
          </Link>

          <Link to="/products">
            New Arrivals
          </Link>

        </div>

        {/* Support */}

        <div className="footer-column">

          <h3>Support</h3>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/wishlist">
            Wishlist
          </Link>

          <Link to="/cart">
            Shopping Cart
          </Link>

        </div>

        {/* Contact */}

        <div className="footer-column">

          <h3>Contact</h3>

          <div className="footer-contact">

            <p>
              <FiMapPin />
              Bijnor Uttar Pradesh , India
            </p>

            <p>
              <FiPhone />
              +91 94560 46007
            </p>

            <p>
              <FiMail />
              sundarkanya.support@gmail.com
            </p>

          </div>

        </div>

      </div>

      {/* Trust Bar */}

      <div className="footer-features">

        <div>

          <FiTruck />

          <span>Free Shipping</span>

        </div>

        <div>

          <FiShield />

          <span>Secure Payment</span>

        </div>

        <div>

          <FiAward />

          <span>Premium Quality</span>

        </div>

        <div>

          <FiRefreshCw />

          <span>Easy Returns</span>

        </div>

      </div>

      {/* Bottom */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Sundar Kanya
          
        </p>

        {/* <div className="footer-bottom-links">

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms
          </Link>

          <Link to="/refund">
            Refund Policy
          </Link>

        </div> */}

      </div>

    </footer>
  );
}

export default Footer;