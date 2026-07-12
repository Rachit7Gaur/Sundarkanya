import { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Navbar.css";

function SearchBar() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {

  e.preventDefault();

  if (!search.trim()) return;

  navigate(
    `/products?search=${encodeURIComponent(search)}`
  );

};

  return (
    <form className="search-container" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search jewellery..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <button type="submit" className="search-btn">
        🔍
      </button>
    </form>
  );
}

export default SearchBar;