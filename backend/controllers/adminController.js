import Product from "../models/Product.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Contact from "../models/Contact.js";

export const getDashboardStats = async (req, res) => {

  try {

    const totalProducts = await Product.countDocuments();

    const totalUsers = await User.countDocuments({
      role: "customer",
    });

    const unreadMessages = await Contact.countDocuments({
      isRead: false,
    });

    const totalOrders = await Order.countDocuments();

    const revenue = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({

      totalProducts,

      totalUsers,

      totalOrders,

      unreadMessages,

      totalRevenue:
        revenue.length > 0
          ? revenue[0].totalRevenue
          : 0,

      recentOrders,

    });

  } catch (error) {

    res.status(500).json({

      message: "Server Error",

      error: error.message,

    });

  }

};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find(
      { role: "customer" },
      "-password"
    ).sort({ createdAt: -1 });

    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};