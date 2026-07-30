import "./MobileFilter.css";

function MobileFilter({
  showFilter,
  setShowFilter,
  selectedCategory,
  setSelectedCategory,
}) {

  const categories = [
    "",
    "earrings",
    "pendant",
    "bracelet",
  ];

  return (
    <>
      <div
        className={`filter-overlay ${showFilter ? "show" : ""}`}
        onClick={() => setShowFilter(false)}
      />

      <div
        className={`filter-sheet ${showFilter ? "show" : ""}`}
      >

        <div className="filter-header">
          <h3>Filters</h3>

          <button
            onClick={() => setShowFilter(false)}
          >
            ✕
          </button>
        </div>

        <div className="filter-body">

          <h4>Category</h4>

          {categories.map((cat) => (

            <button
              key={cat}
              className={`filter-option ${
                selectedCategory === cat
                  ? "active"
                  : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >

              {cat === ""
                ? "All Products"
                : cat.charAt(0).toUpperCase() +
                  cat.slice(1)}

            </button>

          ))}

        </div>

        <div className="filter-footer">

          <button
            className="clear-btn"
            onClick={() => {
              setSelectedCategory("");
              setShowFilter(false);
            }}
          >
            Clear
          </button>

          <button
            className="apply-btn"
            onClick={() => setShowFilter(false)}
          >
            Apply
          </button>

        </div>

      </div>
    </>
  );
}

export default MobileFilter;