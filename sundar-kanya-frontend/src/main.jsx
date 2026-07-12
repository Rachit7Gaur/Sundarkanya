// src/main.jsx

import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>

            <App />

            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#ffffff",
                  color: "#333",
                  borderRadius: "10px",
                  border: "1px solid #f3b6d0",
                  fontSize: "15px",
                },
                success: {
                  iconTheme: {
                    primary: "#d63384",
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#dc3545",
                    secondary: "#fff",
                  },
                },
              }}
            />

          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);