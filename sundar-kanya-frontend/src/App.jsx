import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import ProfilePage from "./pages/Profile/Profile";
import Products from "./pages/Product/Product";
import ProductDetails from "./pages/ProductDetails/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AddProduct from "./pages/Admin/AddProducts/AddProduct";
import ManageProducts from "./pages/Admin/Products/ManageProducts";
import EditProduct from "./pages/Admin/EditProduct/EditProduct";
import Orders from "./pages/Admin/Orders/Orders";
import Dashboard from "./pages/Admin/AdminMenu/AdminMenu";
import AdminLayout from "./components/admin/AdminLayout";
import MyOrders from "./pages/MyOrders/MyOrders";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Messages from "./pages/Admin/Messages/Messages";
import Customers from "./pages/Admin/Customers/Customers";
import Wishlist from "./pages/Wishlist/Wishlist";
import Settings from "./pages/Settings/Settings";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

export default function App() {
  return (
    <div className="app">

      <Navbar />

      <main>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/products/category/:category"
            element={<Products />}
          />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
            />
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />

          {/* Protected Route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-confirmation/:id"
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />

          <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />


         {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />

            <Route
              path="products"
              element={<ManageProducts />}
            />

            <Route
              path="products/add"
              element={<AddProduct />}
            />

            <Route
              path="products/edit/:id"
              element={<EditProduct />}
            />

            <Route
              path="orders"
              element={<Orders />}
            />

            <Route
              path="customers"
              element={<Customers />}
            />

            <Route
              path="messages"
              element={<Messages />}
            />
          </Route>
        </Routes>
      </main>

      <Footer />

    </div>
  );
}