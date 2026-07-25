import Product from "../models/Product.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Contact from "../models/Contact.js";
import Subscriber from "../models/Subscriber.js";
import Settings from "../models/Settings.js";

export const getDashboardStats = async (req, res) => {
  try {

    const totalProducts = await Product.countDocuments();

    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const totalOrders = await Order.countDocuments();

    const deliveredOrders = await Order.find({
      paymentStatus: "paid",
    });

    const totalRevenue = deliveredOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const pendingOrders = await Order.countDocuments({
  orderStatus: "Pending",
});

const deliveredOrdersCount = await Order.countDocuments({
  orderStatus: "Delivered",
});

const lowStockProducts = await Product.countDocuments({
  stock: { $lt: 10 },
});

    const recentOrders = await Order.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);

      const topSellingProducts = await Order.aggregate([
  { $unwind: "$items" },

  {
    $group: {
      _id: "$items.product",
      totalSold: { $sum: "$items.quantity" },
    },
  },

  {
    $sort: {
      totalSold: -1,
    },
  },

  {
    $limit: 5,
  },

  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product",
    },
  },

  {
    $unwind: "$product",
  },

  {
    $project: {
      _id: 0,
      name: "$product.name",
      image: {
        $arrayElemAt: ["$product.images", 0],
      },
      totalSold: 1,
    },
  },
]);

    res.json({
  totalProducts,
  totalCustomers,
  totalOrders,
  totalRevenue,

  pendingOrders,
  deliveredOrders: deliveredOrdersCount,
  lowStockProducts,
  topSellingProducts,
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

    const customersWithStats = await Promise.all(

      customers.map(async (customer) => {

        const orders = await Order.find({
          user: customer._id,
        });

        const totalOrders = orders.length;

        const totalSpent = orders.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );

        return {
          ...customer.toObject(),
          totalOrders,
          totalSpent,
        };

      })

    );

    res.json(customersWithStats);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getCustomerById = async (req, res) => {
  try {

    const customer = await User.findById(
      req.params.id,
      "-password"
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const orders = await Order.find({
      user: customer._id,
    }).sort({ createdAt: -1 });

    const totalOrders = orders.length;

    const totalSpent = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.json({
      customer,
      totalOrders,
      totalSpent,
      orders,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }
};

export const getAnalytics = async (req, res) => {
  try {

    const range = Number(req.query.range) || 30;

    const startDate = new Date();

    startDate.setDate(startDate.getDate() - range);

    const monthlyData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id": 1
        }
      }
    ]);

    const categorySales = await Order.aggregate([
      {
  $match: {
    createdAt: { $gte: startDate },
  },
},
  {
    $unwind: "$items",
  },
  {
    $lookup: {
      from: "products",
      localField: "items.product",
      foreignField: "_id",
      as: "product",
    },
  },
  {
    $unwind: "$product",
  },
  {
    $group: {
      _id: "$product.category",
      totalSold: {
        $sum: "$items.quantity",
      },
    },
  },
]);

const customerGrowth = await User.aggregate([
  {
  $match: {
    createdAt: { $gte: startDate },
  },
},
  {
    $match: {
      role: "customer",
    },
  },
  {
    $group: {
      _id: {
        $month: "$createdAt",
      },
      customers: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      "_id": 1,
    },
  },
]);

const orderStatusData = await Order.aggregate([
  {
  $match: {
    createdAt: { $gte: startDate },
  },
},
  {
    $group: {
      _id: "$orderStatus",
      value: {
        $sum: 1,
      },
    },
  },
]);

res.json({
  monthlyData,
  categorySales,
  customerGrowth,
  orderStatusData,
});

  } catch (error) {

    res.status(500).json({
      message: "Analytics Error",
      error: error.message,
    });

  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({
      createdAt: -1,
    });

    res.json(subscribers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteSubscriber = async (req, res) => {
  try {

    await Subscriber.findByIdAndDelete(req.params.id);

    res.json({
      message: "Subscriber deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        req.body,
        { new: true }
      );
    }

    res.json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const searchAdmin = async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) {
      return res.json({
        products: [],
        customers: [],
        orders: [],
        subscribers: [],
      });
    }

    const products = await Product.find({
      name: { $regex: q, $options: "i" },
    }).limit(5);

    const customers = await User.find({
      role: "customer",
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    })
      .select("-password")
      .limit(5);

   const orders = await Order.find().limit(5);

    const subscribers = await Subscriber.find({
      email: { $regex: q, $options: "i" },
    }).limit(5);

    res.json({
      products,
      customers,
      orders,
      subscribers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getNotifications = async (req, res) => {
  try {

    const orders = await Order.find()
  .sort({ createdAt: -1 })
  .limit(5);

  const customers = await User.find()
  .sort({ createdAt: -1 })
  .limit(5);

const contacts = await Contact.find()
  .sort({ createdAt: -1 })
  .limit(5);

const subscribers = await Subscriber.find()
  .sort({ createdAt: -1 })
  .limit(5);

  const notifications = [];

  orders.forEach((order) => {
  notifications.push({
    type: "order",
    message: `New order #${order._id}`,
    createdAt: order.createdAt,
    link: "/admin/orders",
  });
});

customers.forEach((customer) => {
  notifications.push({
    type: "customer",
    message: `${customer.name} registered`,
    createdAt: customer.createdAt,
    link: "/admin/customers",
  });
});

contacts.forEach((contact) => {
  notifications.push({
    type: "contact",
    message: `New contact from ${contact.name}`,
    createdAt: contact.createdAt,
    link: "/admin/contact",
  });
});

subscribers.forEach((subscriber) => {
  notifications.push({
    type: "newsletter",
    message: `${subscriber.email} subscribed`,
    createdAt: subscriber.createdAt,
    link: "/admin/newsletter",
  });
});

notifications.sort(
  (a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
);
res.json(notifications.slice(0, 10));
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};