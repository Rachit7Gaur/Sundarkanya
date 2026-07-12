import express from "express";
import { registerUser, loginUser, getProfile , getSettings ,updateSettings , changePassword , forgotPassword , resetPassword} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.get("/settings" , protect , getSettings );
router.put("/settings" , protect , updateSettings);
router.put("/change-password",protect,changePassword);
router.post(
  "/forgot-password",
  forgotPassword
);


router.put(
  "/reset-password/:token",
  resetPassword
);

export default router;