import "./WhyChoose.css";
import features from "../../data/features";

function WhyChoose() {
  return (
    <section className="why-choose-section">

      <div className="section-heading">

        <span className="section-tag">
          Why Choose Us
        </span>

        <h2>Why Choose Sundar Kanya?</h2>

        <p>
          Crafted with elegance, inspired by tradition, and designed
          to make every woman feel timeless.
        </p>

      </div>

      <div className="feature-grid">

        {features.map((feature) => {

          const Icon = feature.icon;

          return (

            <div
              className="feature-card"
              key={feature.id}
            >

              <div className="feature-icon">
                <Icon />
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>

          );

        })}

      </div>

    </section>
  );
}

export default WhyChoose;