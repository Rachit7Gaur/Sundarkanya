import "./Footer.css";
import { Link } from "react-router-dom";
import footerLinks from "../../data/footerLinks";

import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube
} from "react-icons/fa";

function Footer() {

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-brand">

          <h2>Sundarkanya</h2>

          <p>
            Elegant jewellery crafted with love,
            beauty and timeless designs.
          </p>

          <div className="social-icons">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

          </div>

        </div>

        {/* Quick Links */}

        <div>

          <h3>Quick Links</h3>

          <ul>

            {footerLinks.quickLinks.map((item) => (

              <li key={item.name}>

                <Link to={item.path}>
                  {item.name}
                </Link>

              </li>

            ))}

          </ul>

        </div>

        {/* Categories */}

        <div>

          <h3>Categories</h3>

          <ul>

            {footerLinks.categories.map((item) => (

              <li key={item.name}>

                <Link to={item.path}>
                  {item.name}
                </Link>

              </li>

            ))}

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3>Contact</h3>

          <p>{footerLinks.contact.address}</p>

          <p>{footerLinks.contact.phone}</p>

          <p>{footerLinks.contact.email}</p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
           {new Date().getFullYear()} Sundarkanya
        </p>

      </div>

    </footer>
  );
}

export default Footer;