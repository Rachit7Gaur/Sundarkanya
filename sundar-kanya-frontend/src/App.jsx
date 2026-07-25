import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";


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

// Admin Layout
import AdminLayout from "./admin/layout/AdminLayout";

// Admin Pages
import Dashboard from "./admin/pages/Dashboard/Dashboard";
import ManageProducts from "./admin/pages/Products/ManageProducts";
import AddProduct from "./admin/pages/Products/AddProduct";
import EditProduct from "./admin/pages/Products/EditProduct";
import Orders from "./admin/pages/Orders/Orders";
import OrderDetails from "./admin/pages/Orders/OrderDetails"
import Customers from "./admin/pages/Customers/Customers";
import CustomerDetails from "./admin/pages/Customers/CustomerDetails";
import Analytics from "./admin/pages/Analytics/Analytics";
import Newsletter from "./admin/pages/Newsletter/Newsletter";
import Settings from "./admin/pages/Settings/Settings";

import MyOrders from "./pages/MyOrders/MyOrders";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Wishlist from "./pages/Wishlist/Wishlist";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ScrollToTop from "./components/ScrollToTop";

function App() {

  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");
 return (
  <div className="app">

    {!isAdminRoute && <Navbar />}

    <main className={isAdminRoute ? "" : "main-content"}>
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

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* Protected Routes */}

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
          path="/wishlist" 
          element={
            <ProtectedRoute>
              <Wishlist />
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

        {/* Admin */}

        <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />}/>   
          <Route path="customers" element={<Customers />}/>
          <Route path="customers/:id" element={<CustomerDetails />}/>   
          <Route path="analytics" element={<Analytics />} />   
          <Route path="newsletter" element={<Newsletter />}/>  
          <Route path="settings" element={<Settings />} />
         </Route>

      </Routes>
    </main>

    {!isAdminRoute && <Footer />}

  </div>
);

}

export default App;