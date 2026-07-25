import ProductCard from "./ProductCard";

function RelatedProducts({ relatedProducts }) {
  return (
    <section className="pd-related">

      <div className="pd-related-heading">

        <span>
          YOU MAY ALSO LIKE
        </span>

        <h2>
          Similar Jewellery
        </h2>

        <p>
          Carefully selected jewellery that perfectly
          matches your style.
        </p>

      </div>

      <div className="pd-related-grid">

        {relatedProducts.length === 0 ? (

          <div className="pd-related-empty">
            No Related Products
          </div>

        ) : (

          relatedProducts.map((item) => (

            <ProductCard
              key={item._id}
              product={item}
            />

          ))

        )}

      </div>

    </section>
  );
}

export default RelatedProducts;