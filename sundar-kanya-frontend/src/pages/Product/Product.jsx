import { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate
} from "react-router-dom";

import {
  getProducts,
  getProductsByCategory,
} from "../../services/productService";

import ProductCard from "../../components/Product/ProductCard";
import "./Product.css";

import earringsBanner from "../../assets/category-banners/earrings-banner.png";
import pendantBanner from "../../assets/category-banners/pendant-banner.png";
import braceletBanner from "../../assets/category-banners/bracelet-banner.png";

const categoryImages = {
  earrings: earringsBanner,
  pendant: pendantBanner,
  bracelet: braceletBanner,
};

const Products = () => {
  const navigate = useNavigate();

  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      let data;

      if (category) {
        data = await getProductsByCategory(category);
      } else {
        data = await getProducts();
      }

      setProducts(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  let filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (sort === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "newest") {
    filteredProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (loading) {
    return <h2 className="loading">Loading Products...</h2>;
  }

  const categories = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Earrings",
    value: "earrings",
  },
  {
    label: "Pendants",
    value: "pendant",
  },
  {
    label: "Bracelets",
    value: "bracelet",
  },
];

  return (
  <div className="cp-page">

    {/* Hero */}

    <section
      className="cp-hero"
      style={{
        backgroundImage: `url(${
          categoryImages[category] || earringsBanner
        })`,
      }}
    >
      <div className="cp-overlay">

        <span className="cp-tag">
          LUXURY JEWELLERY
        </span>

        <h1 className="cp-title">
          {category
            ? category.charAt(0).toUpperCase() +
              category.slice(1)
            : "Our Collection"}
        </h1>

        <p className="cp-subtitle">
          Discover handcrafted jewellery
          designed to celebrate every moment.
        </p>

      </div>
    </section>

    <section className="cp-categories">

  {categories.map((item) => (

    <button
      key={item.value}
      className={`cp-category-btn ${
        category === item.value ||
        (!category && item.value === "")
          ? "active"
          : ""
      }`}
      onClick={() =>
        navigate(
          item.value
            ? `/products/category/${item.value}`
            : "/products"
        )
      }
    >

      {item.label}

    </button>

  ))}

</section>

    {/* Toolbar */}

    <section className="cp-toolbar">

  <div className="cp-toolbar-left">

    <h2 className="cp-heading">
      Our Collection
    </h2>

    <p className="cp-count">
      Showing <strong>{filteredProducts.length}</strong> jewellery pieces
    </p>

  </div>

  <div className="cp-toolbar-right">

    <label className="cp-sort-label">
      Sort By
    </label>

    <select
      className="cp-sort"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
    >
      <option value="">Featured</option>

      <option value="low-high">
        Price: Low to High
      </option>

      <option value="high-low">
        Price: High to Low
      </option>

      <option value="newest">
        Newest Arrivals
      </option>

    </select>

  </div>

</section>

    {/* Products */}

    <section className="cp-grid">

      {filteredProducts.length === 0 ? (

        <div className="cp-empty">

    <div className="cp-empty-icon">
        💎
    </div>

    <h2>No Jewellery Found</h2>

    <p>
        We couldn't find any jewellery matching your search.
    </p>

    <button
        className="cp-reset-btn"
        onClick={() => navigate("/products")}
    >
        View All Collection
    </button>

</div>

      ) : (

        filteredProducts.map((product) => (

          <ProductCard
            key={product._id}
            product={product}
          />

        ))

      )}

    </section>

  </div>
);
};

export default Products;