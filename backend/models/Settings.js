import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      default: "Sundar Kanya",
    },

    email: {
      type: String,
      default: "contact@sundarkanya.com",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

   heroSlides: {
  type: [
    {
      subtitle: String,
      title1: String,
      title2: String,
      button: String,
      link: String,
      image: String,
    },
  ],

  default: [
    {
      subtitle: "Handcrafted Fine Jewellery",
      title1: "Shine,",
      title2: "Quietly.",
      button: "Shop Collection",
      link: "/products",
      image: "/images/hero-model.jpg",
    },
    {
      subtitle: "Timeless Beauty",
      title1: "Luxury",
      title2: "Jewellery",
      button: "Explore Collection",
      link: "/products",
      image: "/images/hero-model2.jpg",
    },
    {
      subtitle: "Premium Collection",
      title1: "Elegance",
      title2: "Forever",
      button: "Shop Now",
      link: "/products",
      image: "/images/hero-model3.jpg",
    },
  ],
},

    instagram: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },

    pinterest: {
      type: String,
      default: "",
    },

    currency: {
      type: String,
      default: "₹",
    },

    shippingCharge: {
      type: Number,
      default: 0,
    },

    freeShippingAbove: {
      type: Number,
      default: 999,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);