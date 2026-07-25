import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getSettings,
  updateSettings,
} from "../../services/adminService";
import "./Settings.css";

function Settings() {
  const [loading, setLoading] = useState(true);

const [settings, setSettings] = useState({
  storeName: "",
  email: "",
  phone: "",
  address: "",
  instagram: "",
  facebook: "",
  youtube: "",
  pinterest: "",
  currency: "",
  shippingCharge: "",
  freeShippingAbove: "",

  heroSlides: [],
});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleHeroChange = (index, field, value) => {
  const updatedSlides = [...settings.heroSlides];

  updatedSlides[index] = {
    ...updatedSlides[index],
    [field]: value,
  };

  setSettings({
    ...settings,
    heroSlides: updatedSlides,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log(settings);

  try {
    await updateSettings(settings);
    toast.success("Settings updated successfully");
  } catch (error) {
    toast.error("Update failed");
  }
};

  if (loading) return <h2>Loading...</h2>;

return (
  <div className="settings-page">

    <h1>Store Settings</h1>

    <form
      className="settings-form"
      onSubmit={handleSubmit}
    >

      {/* Store Information */}

      <h2 className="settings-section-title">
        Store Information
      </h2>

      <div className="settings-grid">

        <div className="form-group">
          <label>Store Name</label>
          <input
            name="storeName"
            value={settings.storeName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            value={settings.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            name="phone"
            value={settings.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            name="address"
            value={settings.address}
            onChange={handleChange}
          />
        </div>

      </div>

      {/* Hero Slider */}

      <h2 className="settings-section-title">
        Hero Slider
      </h2>

      {settings.heroSlides?.map((slide, index) => (

        <div
          key={index}
          className="hero-slide-settings"
        >

          <h3>Slide {index + 1}</h3>

          <div className="settings-grid">

            <div className="form-group">
              <label>Title</label>
              <input
                value={slide.title}
                onChange={(e) =>
                  handleHeroChange(
                    index,
                    "title",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <input
                value={slide.subtitle}
                onChange={(e) =>
                  handleHeroChange(
                    index,
                    "subtitle",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Primary Button</label>
              <input
                value={slide.primaryButton}
                onChange={(e) =>
                  handleHeroChange(
                    index,
                    "primaryButton",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Secondary Button</label>
              <input
                value={slide.secondaryButton}
                onChange={(e) =>
                  handleHeroChange(
                    index,
                    "secondaryButton",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Image Path</label>
              <input
                value={slide.image}
                onChange={(e) =>
                  handleHeroChange(
                    index,
                    "image",
                    e.target.value
                  )
                }
              />
            </div>

          </div>

        </div>

      ))}

      {/* Social Media */}

      <h2 className="settings-section-title">
        Social Media
      </h2>

      <div className="settings-grid">

        <div className="form-group">
          <label>Instagram</label>
          <input
            name="instagram"
            value={settings.instagram}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Facebook</label>
          <input
            name="facebook"
            value={settings.facebook}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>YouTube</label>
          <input
            name="youtube"
            value={settings.youtube}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Pinterest</label>
          <input
            name="pinterest"
            value={settings.pinterest}
            onChange={handleChange}
          />
        </div>

      </div>

      {/* Shipping */}

      <h2 className="settings-section-title">
        Shipping & Currency
      </h2>

      <div className="settings-grid">

        <div className="form-group">
          <label>Currency Symbol</label>
          <input
            name="currency"
            value={settings.currency}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Shipping Charge</label>
          <input
            type="number"
            name="shippingCharge"
            value={settings.shippingCharge}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Free Shipping Above</label>
          <input
            type="number"
            name="freeShippingAbove"
            value={settings.freeShippingAbove}
            onChange={handleChange}
          />
        </div>

      </div>

      <button
        type="submit"
        className="save-btn"
      >
        Save Settings
      </button>

    </form>

  </div>
);
}

export default Settings;