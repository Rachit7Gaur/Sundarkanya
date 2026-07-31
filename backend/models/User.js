import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
  type: String,
  unique: true,
  sparse: true,
  trim: true,
  lowercase: true,
},

password: {
  type: String,
  default: null,
},

phone: {
  type: String,
  default: "",
  unique: true,
  sparse: true,
},

otp: {
  type: String,
  default: null,
},

otpExpire: {
  type: Date,
  default: null,
},

otpVerified: {
  type: Boolean,
  default: false,
},

    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // Profile
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    dateOfBirth: Date,
    profileImage: String,

    // Default Shipping Address
    address: {
      fullName: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      addressLine: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },

      pincode: {
        type: String,
        default: "",
      },
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);