import "./desktop-top-announcement.css";
function TopAnnouncement({ scrolled }) {
  return (
    <div className={`top-announcement ${scrolled ? "hide-bar" : ""}`}>
      <div className="announcement-track">
        <span>✨ Crafting Elegance Since 1985</span>
        <span>•</span>
        {/* <span>Free Shipping on Orders Above ₹2,999</span> */}
        {/* <span>•</span> */}
        {/* <span>BIS Hallmarked Certified Jewellery</span> */}
        {/* <span>•</span> */}
        <span>Secure Payments</span>
        <span>•</span>

        {/* Duplicate for seamless scrolling */}
        <span>✨ Crafting Elegance Since 2023</span>
        <span>•</span>
        {/* <span>Free Shipping on Orders Above ₹2,999</span> */}
        {/* <span>•</span> */}
        <span>Sundar Kanya Jewellery</span>
        <span>•</span>
        <span>Secure Payments</span>
      </div>
    </div>
  );
}

export default TopAnnouncement;