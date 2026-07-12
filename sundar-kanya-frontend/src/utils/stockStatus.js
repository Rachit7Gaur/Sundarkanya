const stockStatus = (stock) => {
  if (stock <= 0) {
    return {
      text: "Out of Stock",
      color: "#dc3545",
    };
  }

  if (stock <= 5) {
    return {
      text: `Only ${stock} left`,
      color: "#ff9800",
    };
  }

  return {
    text: `In Stock (${stock} available)`,
    color: "#28a745",
  };
};

export default stockStatus;