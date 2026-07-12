import "./Categories.css";
import { Link } from "react-router-dom";

import earrings from "../../assets/categories/earrings.jpeg";
import pendants from "../../assets/categories/pendants.jpeg";
import bracelets from "../../assets/categories/bracelets.jpeg";
// import rings from "../../assets/categories/rings.jpg";

const categories = [
  {
    id: 1,
    name: "Earrings",
    image: earrings,
    path: "/products/category/earrings",
  },
  {
    id: 2,
    name: "Pendants",
    image: pendants,
    path: "/products/category/pendant",
  },
  {
    id: 3,
    name: "Bracelets",
    image: bracelets,
    path: "/products/category/bracelet",
  },
];

function Categories() {
  return (
    <section className="categories">

      <div className="section-title">
        <h2>Shop by Category</h2>
        <p>Find the perfect jewellery for every occasion.</p>
      </div>

      <div className="category-grid">
        {categories.map((item) => (
          <Link
            to={item.path}
            className="category-card"
            key={item.id}
          >
            <img src={item.image} alt={item.name} />

            <div className="category-overlay">
              <h3>{item.name}</h3>
              <button>Shop Now</button>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}

export default Categories;