import { useState } from "react";
import "./ProductAccordion.css";

function ProductAccordion({ product }) {

  const [open, setOpen] = useState("description");

  const toggle = (section) => {
    setOpen(open === section ? "" : section);
  };

  return (

    <div className="accordion-wrapper">

      {/* Description */}

      <div className="accordion-card">

        <button
          className="accordion-header"
          onClick={() => toggle("description")}
        >
          <span>Description</span>
          <span>{open === "description" ? "−" : "+"}</span>
        </button>

        {open === "description" && (

          <div className="accordion-body">

            {product.description}

          </div>

        )}

      </div>

      {/* Specifications */}

      <div className="accordion-card">

        <button
          className="accordion-header"
          onClick={() => toggle("spec")}
        >
          <span>Specifications</span>
          <span>{open === "spec" ? "−" : "+"}</span>
        </button>

        {open === "spec" && (

          <div className="accordion-body">

            <div className="spec-row">
              <span>Category</span>
              <strong>{product.category}</strong>
            </div>

            <div className="spec-row">
              <span>Stock</span>
              <strong>{product.stock}</strong>
            </div>

            <div className="spec-row">
              <span>Material</span>
              <strong>Premium Alloy</strong>
            </div>

            <div className="spec-row">
              <span>Finish</span>
              <strong>Gold Plated</strong>
            </div>

          </div>

        )}

      </div>

      {/* Shipping */}

      <div className="accordion-card">

        <button
          className="accordion-header"
          onClick={() => toggle("shipping")}
        >
          <span>Shipping & Returns</span>
          <span>{open === "shipping" ? "−" : "+"}</span>
        </button>

        {open === "shipping" && (

          <div className="accordion-body">

            <p>🚚 Free Shipping Across India</p>

            <p>📦 Dispatch within 24 Hours</p>

            <p>🔄 7 Days Easy Return</p>

            <p>💳 Secure Online Payment</p>

          </div>

        )}

      </div>

    </div>

  );

}

export default ProductAccordion;