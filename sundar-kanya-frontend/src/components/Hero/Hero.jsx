import "./Hero.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWebsiteSettings } from "../../services/settingsService";

function Hero() {
  const [settings, setSettings] = useState(null);
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getWebsiteSettings();
        setSettings(data);
        setSlides(data.heroSlides || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);
  const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % slides.length);
};

const prevSlide = () => {
  setCurrentSlide((prev) =>
    prev === 0 ? slides.length - 1 : prev - 1
  );
};

  const slide = slides[currentSlide];

  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-label">
          {settings?.storeName || "Sundar Kanya"}
        </span>

        <h1>{slide?.title || "Shine, Quietly."}</h1>

        <p>
          {slide?.subtitle ||
            "Elegant jewellery for every occasion."}
        </p>

        <div className="hero-buttons">
          <Link
            to="/products"
            className="hero-btn"
          >
            {slide?.primaryButton || "Shop Collection"}
          </Link>

          <Link
            to="/about"
            className="hero-btn-outline"
          >
            {slide?.secondaryButton || "Our Story"}
          </Link>
        </div>

        <div className="hero-navigation">
          <button onClick={prevSlide}>❮</button>

          <button onClick={nextSlide}>❯</button>
        </div>
      </div>

      <div className="hero-image">
        <img
          src={slide?.image || "/images/hero-model.jpg"}
          alt={slide?.title || "Sundar Kanya Jewellery"}
        />
      </div>
    </section>
  );
}

export default Hero;