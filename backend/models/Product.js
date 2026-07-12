import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  price: { 
    type: Number,
    required: true 
  },
  stock: { 
    type: Number, 
    default: 0 
  },
  category: {
    type: String,
    enum: ["pendant", "earrings", "bracelet"],
    required: true
  },
  images: {
    type:[String],
    default:[]
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  averageRating: {
  type: Number,
  default: 0,
},

numReviews: {
  type: Number,
  default: 0,
},
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
