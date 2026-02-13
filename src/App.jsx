import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";


/* COMMON */
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

/* AUTH */
import AuthSidebar from "./auth/AuthSidebar";

/* CART */
import { CartProvider } from "./context/CartContext";
import CartPopup from "./components/cart/CartPopup";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import RefundCancellation from "./pages/RefundCancellation";
import ShippingPolicy from "./pages/ShippingPolicy";
import Terms from "./pages/Terms";
import ViewCart from "./pages/ViewCart";

/* MY ACCOUNT */
import MyAccountLayout from "./pages/my-account/MyAccountLayout";
import Dashboard from "./pages/my-account/Dashboard";
import Orders from "./pages/my-account/Orders";
import Downloads from "./pages/my-account/Downloads";
import AccountDetails from "./pages/my-account/AccountDetails";
import { Toaster } from "sonner";
import ScrollTop from "./components/ScrollTop";


/* INNER APP (for useNavigate) */
function AppContent() {
  const navigate = useNavigate();

  /* 🔐 Auth Sidebar State */
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState("login");

  const openLogin = () => {
    setAuthView("login");
    setAuthOpen(true);
  };

  return (
    <>
    <Toaster  position="bottom-left" richColors closeButton/>
      {/* HEADER */}
      <Header openLogin={openLogin} />

      {/* AUTH SIDEBAR */}
      <AuthSidebar
        open={authOpen}
        setOpen={setAuthOpen}
        view={authView}
        setView={setAuthView}
      />

      {/* PAGE CONTENT */}
      <main className="min-h-screen bg-[#FEFCF9]">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />

          {/* 🔥 PRODUCT DETAILS (FIXED) */}
          <Route path="/books/:id" element={<ProductDetails />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/refund-cancellation" element={<RefundCancellation />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/view-cart" element={<ViewCart />} />

          {/* MY ACCOUNT */}
          <Route path="/my-account" element={<MyAccountLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="account-details" element={<AccountDetails />} />
          </Route>
        </Routes>
      </main>

      {/* 🔥 GLOBAL CART POPUP */}
      <CartPopup />

      {/* FOOTER */}
      <Footer />
    </>
  );
}

/* MAIN WRAPPER */
function App() {
  return (
    <BrowserRouter>
     <ScrollTop />
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;