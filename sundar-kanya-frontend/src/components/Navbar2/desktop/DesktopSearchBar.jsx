import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function DesktopSearchBar() {

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    console.log(search);

    // Later
    // navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  return (

    <div className="desktop-search-wrapper">

      <form
        className="desktop-search-form"
        onSubmit={handleSubmit}
      >

        <FiSearch className="desktop-search-icon" />

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

export default DesktopSearchBar;