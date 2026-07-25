import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import slides from "./slides";
import "./HeroSlider.css";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function HeroSlider() {


  const [currentSlide, setCurrentSlide] = useState(0);

const nextSlide = () => {
  setCurrentSlide((prev) =>
    prev === slides.length - 1 ? 0 : prev + 1
  );
};

const prevSlide = () => {
  setCurrentSlide((prev) =>
    prev === 0 ? slides.length - 1 : prev - 1
  );
};

useEffect(() => {
  const interval = setInterval(() => {
    nextSlide();
  }, 5000);

  return () => clearInterval(interval);
}, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    
<section className="hero-slider">

  {slides.map((item, index) => (
    <div
      key={index}
      className={`hero-slide ${
        index === currentSlide ? "active" : ""
      }`}
      style={{
        backgroundImage: `url(${item.image})`,
      }}
    />
  ))}

  <div className="hero-overlay"></div>

<div
  key={currentSlide}
  className="hero-content"
>    <p className="hero-subtitle">
      {slide.subtitle}
    </p>

    <h1>
      {slide.title1}
      <br />
      <span>{slide.title2}</span>
    </h1>

    <Link
      to={slide.link}
      className="hero-btn"
    >
      {slide.button}
    </Link>
  </div>

  <button
    className="hero-arrow left"
    onClick={prevSlide}
  >
    <FiChevronLeft />
  </button>

  <button
    className="hero-arrow right"
    onClick={nextSlide}
  >
    <FiChevronRight />
  </button>

<div className="hero-dots">
  {slides.map((_, index) => (
    <button
      key={index}
      className={`hero-dot ${
        currentSlide === index ? "active" : ""
      }`}
      onClick={() => setCurrentSlide(index)}
    />
  ))}
</div>
</section>
  );
}

export default HeroSlider;