import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import crypto from "crypto";
import sendEmail from "../config/sendEmail.js";


const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// Register new user
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      dateOfBirth,
    } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long"
      });
    }

    const existingUser = await User.findOne({
      email: trimmedEmail
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name : trimmedName,
      email : trimmedEmail,
      password: hashedPassword,
      phone,
      gender,
      dateOfBirth,
      role: "customer"
    });

    const token = jwt.sign(
      { id: user._id, 
        role: user.role 
      },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login existing user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const trimmedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    const user = await User.findOne({ email : trimmedEmail });
    if (!user) return res.status(400).json({ 
      message: "Invalid credentials" 
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ 
      message: "Invalid credentials" 
    });

    const token = jwt.sign(
      { id: user._id, 
        role: user.role 
      },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Example: Get profile (protected route)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user settings
export const getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update user settings
export const updateSettings = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (phone !== undefined) user.phone = phone;
    if (gender !== undefined) user.gender = gender;
    if (dateOfBirth !== undefined)
      user.dateOfBirth = dateOfBirth;

    if (address) {
      user.address = {
        ...user.address,
        ...address,
      };
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }
};

export const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "New password must be at least 8 characters",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.save();

    res.json({
      message: "Password changed successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const forgotPassword = async(req,res)=>{

try{

const {email}=req.body;

const user = await User.findOne({email});


if(!user){

return res.status(404).json({
message:"User not found"
});

}


const token = crypto
.randomBytes(32)
.toString("hex");


user.resetPasswordToken =
crypto.createHash("sha256")
.update(token)
.digest("hex");


user.resetPasswordExpire =
Date.now()+15*60*1000;


await user.save();


const resetUrl =
`${config.FRONTEND_URL}/reset-password/${token}`;


console.log("Reset email sending to:", user.email);

await sendEmail({
  email: user.email,
  subject: "Sundar Kanya Password Reset",
  message:
  `
  <h2>SundarKanya Password Reset</h2>

  <p>Hello,</p>

  <p>
  We received a request to reset your SundarKanya account password.
  </p>

  <p>
  Click the button below to create a new password:
  </p>

  <a href="${resetUrl}"
     style="
     display:inline-block;
     padding:12px 20px;
     background:#d63384;
     color:white;
     text-decoration:none;
     border-radius:8px;
     ">
     Reset Password
  </a>

  <p>
  If you did not request this, you can ignore this email.
  </p>

  <p>
  Thanks,<br/>
  SundarKanya Team
  </p>
  `
});


res.json({
message:"Password reset link sent"
});


}catch(error){
console.log("FORGOT PASSWORD ERROR:", error);
res.status(500).json({
message:error.message
});

}

};

export const resetPassword = async (req, res) => {
  try {

    const { token } = req.params;
    const { password } = req.body;


    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");


    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });


    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }


    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }


    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      password,
      salt
    );


    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;


    await user.save();


    res.json({
      message: "Password reset successfully",
    });


  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }
};

export const sendOTP = async (req, res) => {
  try {
    let { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        message: "Mobile number is required",
      });
    }

    phone = phone.replace(/\D/g, "");

    // Indian 10-digit number
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        message: "Please enter a valid Indian mobile number",
      });
    }

    const otp = generateOTP();

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    let user = await User.findOne({ phone });

    if (!user) {
      // Temporary user.
      // Account details will be completed after OTP verification.
      user = await User.create({
        name: "Guest User",
        email: `phone_${phone}@sundarkanya.local`,
        phone,
        password: null,
        role: "customer",
        otp: hashedOTP,
        otpExpire: new Date(Date.now() + 5 * 60 * 1000),
        otpVerified: false,
      });
    } else {
      user.otp = hashedOTP;
      user.otpExpire = new Date(
        Date.now() + 5 * 60 * 1000
      );
      user.otpVerified = false;

      await user.save();
    }

    // DEVELOPMENT ONLY
    console.log(`OTP for ${phone}: ${otp}`);

    res.json({
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    let { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        message: "Mobile number and OTP are required",
      });
    }

    phone = phone.replace(/\D/g, "");

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.otp || !user.otpExpire) {
      return res.status(400).json({
        message: "OTP not requested",
      });
    }

    if (user.otpExpire < new Date()) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (hashedOTP !== user.otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.otp = null;
    user.otpExpire = null;
    user.otpVerified = true;

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "OTP verified successfully",
      token,
      isNewUser:
        user.name === "Guest User",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};