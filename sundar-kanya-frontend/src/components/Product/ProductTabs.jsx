import { useState } from "react";
import "./ProductTabs.css";

function ProductTabs({ product }) {

  const [tab, setTab] = useState("description");

  return (

    <section className="tabs">

      <div className="tabs-header">

        <button
          className={tab==="description" ? "active" : ""}
          onClick={() => setTab("description")}
        >
          Description
        </button>

        <button
          className={tab==="details" ? "active" : ""}
          onClick={() => setTab("details")}
        >
          Details
        </button>

        <button
          className={tab==="shipping" ? "active" : ""}
          onClick={() => setTab("shipping")}
        >
          Shipping
        </button>

        <button
          className={tab==="care" ? "active" : ""}
          onClick={() => setTab("care")}
        >
          Care
        </button>

      </div>

      <div className="tabs-body">

        {tab==="description" && (
          <div>

            <h3>Product Description</h3>

            <p>
              {product.description}
            </p>

          </div>
        )}

        {tab==="details" && (
          <div>

            <table>

              <tbody>

                <tr>
                  <td>Category</td>
                  <td>{product.category}</td>
                </tr>

                <tr>
                  <td>Stock</td>
                  <td>{product.stock}</td>
                </tr>

                <tr>
                  <td>Material</td>
                  <td>Premium Jewellery</td>
                </tr>

                <tr>
                  <td>Finish</td>
                  <td>Luxury Polish</td>
                </tr>

              </tbody>

            </table>

          </div>
        )}

        {tab==="shipping" && (
          <div>

            <h3>Shipping Information</h3>

            <p>

              • Free Shipping across India

              <br/><br/>

              • Dispatch within 24 hours

              <br/><br/>

              • Delivery in 3-7 business days

            </p>

          </div>
        )}

        {tab==="care" && (
          <div>

            <h3>Jewellery Care</h3>

            <p>

              Store in a dry place.

              <br/><br/>

              Avoid perfumes.

              <br/><br/>

              Clean with soft cloth.

            </p>

          </div>
        )}

      </div>

    </section>

  );

}

export default ProductTabs;