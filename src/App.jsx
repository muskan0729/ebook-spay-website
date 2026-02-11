import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import RefundCancellation from "./pages/RefundCancellation";
import ShippingPolicy from "./pages/ShippingPolicy";
import Terms from "./pages/Terms";
import ViewCart from "./pages/ViewCart";
import MyAccountLayout from "./pages/my-account/MyAccountLayout";
import Dashboard from "./pages/my-account/Dashboard";
import Orders from "./pages/my-account/Orders";
import Downloads from "./pages/my-account/Downloads";
import Addresses from "./pages/my-account/Addresses";
import EditBillingAddress from "./pages/my-account/EditBillingAddress";
import EditShippingAddress from "./pages/my-account/EditShippingAddress";
import AccountDetails from "./pages/my-account/AccountDetails";



function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* Page Content */}
      <main className="min-h-screen bg-[#FEFCF9]">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/refund-cancellation" element={<RefundCancellation />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/view-cart" element={<ViewCart />} />
         <Route path="/my-account" element={<MyAccountLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="orders" element={<Orders />} />
  <Route path="downloads" element={<Downloads />} />
  <Route path="addresses" element={<Addresses />} />

  {/* FIXED */}
  <Route path="addresses/edit-address/billing" element={<EditBillingAddress />} />
  <Route path="addresses/edit-address/shipping" element={<EditShippingAddress />} />

  <Route path="account-details" element={<AccountDetails />} />
</Route>




        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
