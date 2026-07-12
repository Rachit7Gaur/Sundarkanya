import "./WhyChoose.css";
import features from "../../data/features";

function WhyChoose() {
  return (
    <section className="why-choose">

      <div className="section-heading">
        <h2>Why Choose Sundarkanya?</h2>

        <p>
          Experience elegance, trust, and premium craftsmanship in every purchase.
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