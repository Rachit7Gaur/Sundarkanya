import { FaStar } from "react-icons/fa";
import "./Testimonials.css";
import testimonials from "../../data/testimonials";

function Testimonials() {
  return (
    <section className="testimonials-section">

      <div className="section-heading">
        <span className="section-tag">Testimonials</span>

        <h2>What Our Customers Say</h2>

        <p>
          Every piece tells a story. Here's what our customers have to say
          about their Sundar Kanya experience.
        </p>
      </div>

      <div className="testimonial-grid">

        {testimonials.map((item) => (
          <div
            className="testimonial-card"
            key={item.id}
          >

            <div className="testimonial-top">

              <img
                src={item.image}
                alt={item.name}
                className="testimonial-avatar"
              />

              <div>

                <h3>{item.name}</h3>

                <span>{item.location}</span>

                <div className="testimonial-stars">
                  {[...Array(item.rating)].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>

              </div>

            </div>

            <div className="testimonial-quote">
              ❝
            </div>

            <p className="testimonial-review">
              {item.review}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Testimonials;