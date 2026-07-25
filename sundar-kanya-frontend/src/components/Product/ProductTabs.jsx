function ProductTabs({ product, activeTab, setActiveTab }) {
  return (
    <div className="pd-tabs">

      <div className="pd-tab-buttons">

        <button
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>

        <button
          className={activeTab === "details" ? "active" : ""}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>

        <button
          className={activeTab === "care" ? "active" : ""}
          onClick={() => setActiveTab("care")}
        >
          Care Guide
        </button>

      </div>

      <div className="pd-tab-content">

        {activeTab === "description" && (
          <p>{product.description}</p>
        )}

        {activeTab === "details" && (
          <div className="pd-detail-list">

            <p>
              <strong>Category :</strong> {product.category}
            </p>

            <p>
              <strong>Material :</strong> Premium Alloy
            </p>

            <p>
              <strong>Finish :</strong> Gold Plated
            </p>

            <p>
              <strong>Skin Friendly :</strong> Yes
            </p>

            <p>
              <strong>Availability :</strong> {product.stock} Pieces
            </p>

          </div>
        )}

        {activeTab === "care" && (
          <ul className="pd-care-list">

            <li>Store inside a jewellery box.</li>

            <li>Avoid water & perfume.</li>

            <li>Clean using soft cloth.</li>

            <li>Keep away from chemicals.</li>

          </ul>
        )}

      </div>

    </div>
  );
}

export default ProductTabs;