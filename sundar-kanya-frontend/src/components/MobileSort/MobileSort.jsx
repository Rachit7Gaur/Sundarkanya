import "./MobileSort.css";

function MobileSort({
  showSort,
  setShowSort,
  sort,
  setSort,
}) {
  const options = [
    {
      label: "Featured",
      value: "",
    },
    {
      label: "Price: Low to High",
      value: "low-high",
    },
    {
      label: "Price: High to Low",
      value: "high-low",
    },
    {
      label: "Newest Arrivals",
      value: "newest",
    },
  ];

  return (
    <>
      <div
        className={`sort-overlay ${
          showSort ? "show" : ""
        }`}
        onClick={() => setShowSort(false)}
      />

      <div
        className={`sort-sheet ${
          showSort ? "show" : ""
        }`}
      >
        <div className="sort-header">
          <h3>Sort By</h3>

          <button
            onClick={() => setShowSort(false)}
          >
            ✕
          </button>
        </div>

        <div className="sort-options">
          {options.map((item) => (
            <button
              key={item.value}
              className={`sort-option ${
                sort === item.value
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setSort(item.value);
                setShowSort(false);
              }}
            >
              <span>{item.label}</span>

              {sort === item.value && (
                <span>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default MobileSort;