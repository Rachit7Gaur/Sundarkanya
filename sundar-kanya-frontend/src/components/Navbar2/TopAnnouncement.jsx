import "./topbars.css";

function TopAnnouncement({scrolled}) {
  return (
    <div className={`top-announcement ${scrolled ? "hide-bar" : ""}`}>
      <div className="announcement-track">

        <span>✨ Crafting Elegance Since 2023</span>
        <span>•</span>

        <span>Free Shipping Above ₹2,999</span>
        <span>•</span>

        <span>BIS Hallmarked Jewellery</span>
        <span>•</span>

        <span>100% Secure Payments</span>
        <span>•</span>

        {/* Duplicate for seamless marquee */}

        <span>✨ Crafting Elegance Since 2023</span>
        <span>•</span>

        <span>Free Shipping Above ₹2,999</span>
        <span>•</span>

        <span>BIS Hallmarked Jewellery</span>
        <span>•</span>

        <span>100% Secure Payments</span>

      </div>
    </div>
  );
}

export default TopAnnouncement;