import { Link } from "react-router-dom";
import logo from "../../assets/images/logoo.png";

export default function Footer() {
  return (
    <>
      {/* MAIN FOOTER */}
      <footer className="bg-[#EAF7F4] border-t">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm text-gray-700">
            
            {/* COMPANY */}
            <div>
              <h4 className="text-base font-semibold mb-5 text-gray-900">
                Company
              </h4>
              <ul className="space-y-3">
                <li><Link to="/" className="hover:text-[#0C6E63] transition">Home</Link></li>
                <li><Link to="/shop" className="hover:text-[#0C6E63] transition">Shop</Link></li>
                <li><Link to="/about" className="hover:text-[#0C6E63] transition">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-[#0C6E63] transition">Contact Us</Link></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="text-base font-semibold mb-5 text-gray-900">
                Legal
              </h4>
              <ul className="space-y-3">
                <li><Link to="/privacy-policy" className="hover:text-[#0C6E63] transition">Privacy Policy</Link></li>
                <li><Link to="/refund-cancellation" className="hover:text-[#0C6E63] transition">Refund & Cancellation</Link></li>
                <li><Link to="/refund-policy" className="hover:text-[#0C6E63] transition">Refund Policy</Link></li>
                <li><Link to="/shipping-policy" className="hover:text-[#0C6E63] transition">Shipping Policy</Link></li>
                <li><Link to="/terms" className="hover:text-[#0C6E63] transition">Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div>
              <h4 className="text-base font-semibold mb-5 text-gray-900">
                Follow Us
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-[#0C6E63] transition">Facebook</a></li>
                <li><a href="#" className="hover:text-[#0C6E63] transition">Twitter</a></li>
                <li><a href="#" className="hover:text-[#0C6E63] transition">Instagram</a></li>
                <li><a href="#" className="hover:text-[#0C6E63] transition">Pinterest</a></li>
              </ul>
            </div>

            {/* ADDRESS */}
            <div>
              <h4 className="text-base font-semibold mb-5 text-gray-900">
                Registered Office
              </h4>
              <p className="leading-relaxed text-gray-600">
                316 Laxmi Plaza,<br />
                Laxmi Industrial Estate,<br />
                Andheri West,<br />
                Mumbai, Maharashtra - 400053.
              </p>
            </div>

          </div>
        </div>
      </footer>

      {/* COPYRIGHT BAR */}
      <div className="bg-[#BFE9E1] py-1">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm font-medium text-gray-800">
          
          <p className="text-center sm:text-left">
            © 2026 Ebookspay. All Rights Reserved | Powered by Spay Fintech Pvt Ltd
          </p>

          <img
            src={logo}
            alt="Ebookspay Logo"
            className="w-24"
          />
          
        </div>
      </div>
    </>
  );
}
