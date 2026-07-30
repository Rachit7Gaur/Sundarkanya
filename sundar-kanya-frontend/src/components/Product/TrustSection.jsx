import {
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
  FaLock,
} from "react-icons/fa";

import "./TrustSection.css";

function TrustSection() {

  const items = [
    {
      icon: <FaShieldAlt />,
      title: "Certified Jewellery",
      subtitle: "Premium Quality",
    },
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      subtitle: "Across India",
    },
    {
      icon: <FaUndoAlt />,
      title: "Easy Returns",
      subtitle: "7 Day Return",
    },
    {
      icon: <FaLock />,
      title: "Secure Payment",
      subtitle: "100% Safe Checkout",
    },
  ];

  return (

    <section className="trust-section">

      {items.map((item, index) => (

        <div
          className="trust-card"
          key={index}
        >

          <div className="trust-icon">
            {item.icon}
          </div>

          <div>

            <h4>{item.title}</h4>

            <p>{item.subtitle}</p>

          </div>

        </div>

      ))}

    </section>

  );

}

export default TrustSection;