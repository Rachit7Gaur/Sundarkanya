import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import "./mobile-search.css";

function MobileSearchBar() {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    console.log(search);

    // Later:
    // navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="mobile-search-wrapper">

      <form
        className="mobile-search-form"
        onSubmit={handleSubmit}
      >

        <FiSearch className="mobile-search-icon" />

        <input
          type="text"
          placeholder="Search Jewellery..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </form>

    </div>
  );
}

export default MobileSearchBar;