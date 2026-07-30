import { useState , useEffect , useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { searchProducts } from "../../services/productService";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const searchRef = useRef(null);

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
    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
}, [debouncedSearch]);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setResults([]);
      setSelectedIndex(-1);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  const handleSearchChange = (value) => {
  setSearch(value);
};

const handleKeyDown = (e) => {
  if (!results.length) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setSelectedIndex((prev) =>
      prev < results.length - 1 ? prev + 1 : 0
    );
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : results.length - 1
    );
  }

  if (e.key === "Enter" && selectedIndex >= 0) {
    e.preventDefault();

    navigate(`/products/${results[selectedIndex]._id}`);
    setSearch("");
    setResults([]);
    setSelectedIndex(-1);
  }

  if (e.key === "Escape") {
    setResults([]);
    setSelectedIndex(-1);
  }
};
  return (
    <div ref={searchRef} className="search-wrapper">
    <form
        className="luxury-search"
        onSubmit={handleSearch}
        autoComplete="off"
      >
      <FiSearch className="search-icon" />

      <input
  type="text"
  placeholder="Search jewellery..."
  value={search}
  spellCheck={false}
  onChange={(e)=>handleSearchChange(e.target.value)}
  onKeyDown={handleKeyDown}
/>

    
    </form>
     {search.trim() && (
  <div className="search-dropdown">
    {results.length > 0 ? (
      results.map((product, index) => (
        <div
          key={product._id}
          className={`search-item ${
            selectedIndex === index ? "active" : ""
          }`}
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

          <div className="search-info">
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
        </div>
      ))
    ) : (
      <div className="no-results">
        No products found 😔
      </div>
    )}
  </div>
)}
    </div>
  );
}

export default SearchBar;