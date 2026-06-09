import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useState, useEffect } from "react";

/* COMMON */
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

/* AUTH */
import AuthSidebar from "./components/auth/AuthSidebar";

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
//import OrderComplete from "./pages/OrderComplete";

/* MY ACCOUNT */
import MyAccountLayout from "./pages/my-account/MyAccountLayout";
import Dashboard from "./pages/my-account/Dashboard";
import Orders from "./pages/my-account/Orders";
import Downloads from "./pages/my-account/Downloads";
import AccountDetails from "./pages/my-account/AccountDetails";

/* ADMIN */
import AdminLayout from "./components/common/AdminLayout";
import AdminRoute from "./pages/admin/AdminRoute";
import DashboardAdmin from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Ebooks from "./pages/admin/Ebooks";
import Allorders from "./pages/admin/Allorders";
import Users from "./pages/admin/Users";
import Transactions from "./pages/admin/Transactions";

/* UTIL */
import { Toaster } from "sonner";
import ScrollTop from "./components/ScrollTop";
import PaymentPage from "./pages/PaymentPage";
import PaymentResult from "./pages/PaymentResult";

/* ================= INNER APP ================= */

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect admin route
  const isAdmin = location.pathname.startsWith("/admin");

  /* AUTH SIDEBAR */
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState("login");

  /* CART POPUP */
  const [cartOpen, setCartOpen] = useState(false);

  // OPEN LOGIN SIDEBAR
  const openLogin = () => {
    setAuthView("login");
    setAuthOpen(true);
  };

  // GLOBAL CART POPUP EVENT
  useEffect(() => {
    const handler = () => {
      setCartOpen(true);
    };

    window.addEventListener(
      "open-cart-popup",
      handler
    );

    return () => {
      window.removeEventListener(
        "open-cart-popup",
        handler
      );
    };
  }, []);

  return (
    <>
      <Toaster
        position="bottom-left"
        richColors
        closeButton
      />

      {/* HEADER */}
      {!isAdmin && (
        <Header
          openLogin={openLogin}
          setCartOpen={setCartOpen}
        />
      )}

      {/* AUTH SIDEBAR */}
      {!isAdmin && (
        <AuthSidebar
          open={authOpen}
          setOpen={setAuthOpen}
          view={authView}
          setView={setAuthView}
        />
      )}

      {/* MAIN */}
      <main className="min-h-screen bg-[#FEFCF9]">
        <Routes>

          {/* PUBLIC */}

          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<ShopPage />} />

          <Route
            path="/books/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route path="/about" element={<AboutUs />} />

          <Route
            path="/contact"
            element={<ContactUs />}
          />

          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />

          <Route
            path="/refund-policy"
            element={<RefundPolicy />}
          />

          <Route
            path="/refund-cancellation"
            element={<RefundCancellation />}
          />

          <Route
            path="/shipping-policy"
            element={<ShippingPolicy />}
          />

          <Route path="/terms" element={<Terms />} />

          <Route
            path="/view-cart"
            element={<ViewCart />}
          />

          {/* <Route
            path="/order"
            element={<OrderComplete />}
          /> */}
          <Route
            path="/payment"
            element={<PaymentPage />}
          />

          <Route
            path="/payment-result"
            element={<PaymentResult />}
          />

          {/* MY ACCOUNT */}

          <Route
            path="/my-account"
            element={<MyAccountLayout />}
          >
            <Route index element={<Dashboard />} />

            <Route
              path="orders"
              element={<Orders />}
            />

            <Route
              path="downloads"
              element={<Downloads />}
            />

            <Route
              path="account-details"
              element={<AccountDetails />}
            />
          </Route>

          {/* ADMIN */}

          <Route element={<AdminRoute />}>
            <Route
              path="/admin/*"
              element={<AdminLayout />}
            >
              <Route
                index
                element={<DashboardAdmin />}
              />

              <Route
                path="categories"
                element={<Categories />}
              />

              <Route
                path="ebooks"
                element={<Ebooks />}
              />

              <Route
                path="orders"
                element={<Allorders />}
              />

              <Route
                path="users"
                element={<Users />}
              />

              <Route
                path="transactions"
                element={<Transactions />}
              />
            </Route>
          </Route>

        </Routes>
      </main>

      {/* GLOBAL CART POPUP */}
      {!isAdmin && (
        <CartPopup
          open={cartOpen}
          setOpen={setCartOpen}
          setAuthOpen={setAuthOpen}
          setAuthView={setAuthView}
        />
      )}

      {/* FOOTER */}
      {!isAdmin && <Footer />}
    </>
  );
}

/* ================= MAIN APP ================= */

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