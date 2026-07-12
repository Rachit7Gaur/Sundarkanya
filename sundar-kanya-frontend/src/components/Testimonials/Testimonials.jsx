import "./Testimonials.css";
import testimonials from "../../data/testimonials";

function Testimonials() {
  return (
    <section className="testimonials">

      <div className="section-heading">
        <h2>What Our Customers Say</h2>
        <p>
          Trusted by thousands of happy customers.
        </p>
      </div>

      <div className="testimonial-grid">

        {testimonials.map((item) => (

          <div
            className="testimonial-card"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.name}
            />

            <h3>{item.name}</h3>

            <span>{item.location}</span>

            <div className="stars">
              {"⭐".repeat(item.rating)}
            </div>

            <p>"{item.review}"</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Testimonials;