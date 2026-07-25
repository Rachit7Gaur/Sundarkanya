import { Link } from "react-router-dom";
import earrings from "../../assets/categories/earrings.jpeg";
import pendants from "../../assets/categories/pendants.jpeg";
import bracelets from "../../assets/categories/bracelets.jpeg";
import "./ShopByCategory.css";

const categories = [
  {
    name: "Earrings",
    image: earrings,
    link: "/products/category/earrings",
  },
  {
    name: "Pendants",
    image: pendants,
    link: "/products/category/pendant",
  },
  {
    name: "Bracelets",
    image: bracelets,
    link: "/products/category/bracelet",
  },
];

function ShopByCategory() {
  return (
    <section className="shop-category">
      <div className="section-title">
        <p>EXPLORE OUR COLLECTIONS</p>
        <h2>Shop by Category</h2>
      </div>

      <div className="category-grid">
        {categories.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className="category-card"
          >
            <img
              src={item.image}
              alt={item.name}
            />

     <div className="shop-category-overlay">
                <h3>{item.name}</h3>

              <span>Explore Collection</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ShopByCategory;