import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { searchProducts } from "../../../services/productService";

function MobileSearchBar() {

  const navigate = useNavigate();

  const searchRef = useRef(null);

  const [search, setSearch] = useState("");

  const [results, setResults] = useState([]);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);

  }, [search]);

  useEffect(() => {

    const fetchProducts = async () => {

      if (!debouncedSearch.trim()) {
        setResults([]);
        return;
      }

      try {

        const data = await searchProducts(debouncedSearch);

        setResults(data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchProducts();

  }, [debouncedSearch]);

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setResults([]);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/products?search=${encodeURIComponent(search)}`
    );

  };

  return (

    <div
      className="mobile-search"
      ref={searchRef}
    >

      <form
        className="mobile-search-form"
        onSubmit={handleSubmit}
      >

        <FiSearch className="mobile-search-icon" />

        <input
          type="text"
          placeholder="Search Jewellery..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </form>

      {search.trim() && (

        <div className="mobile-search-dropdown">

          {results.length > 0 ? (

            results.map((product) => (

              <div
                key={product._id}
                className="mobile-search-item"
                onClick={() => {

                  navigate(`/products/${product._id}`);

                  setSearch("");

                  setResults([]);

                }}
              >

                <img
                  src={product.images[0]}
                  alt={product.name}
                />

                <div>

                  <h4>{product.name}</h4>

                  <p>₹{product.price}</p>

                </div>

              </div>

            ))

          ) : (

            <div className="mobile-no-result">
              No products found
            </div>

          )}

        </div>

      )}

    </div>

  );

}

export default MobileSearchBar;