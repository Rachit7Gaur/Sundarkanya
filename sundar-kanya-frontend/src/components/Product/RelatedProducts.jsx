import ProductCard from "../Product/ProductCard";
import RelatedProductCard from "../RelatedProductCard/RelatedProductCard";
import "./RelatedProducts.css";

function RelatedProducts({ relatedProducts }) {

  if (relatedProducts.length === 0) return null;

  return (

    <section className="related-section">

      <h2 className="related-title">
        You May Also Like
      </h2>

      <div className="related-products">

        {relatedProducts.map((product) => (

          <RelatedProductCard
              key={product._id}
              product={product}
          />

        ))}

      </div>

    </section>

  );

}

export default RelatedProducts;