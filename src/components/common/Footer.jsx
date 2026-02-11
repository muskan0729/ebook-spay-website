import { Link } from "react-router-dom";



const activeLink = "footer-link active";
const normalLink = "footer-link";


export default function Footer() {
  return (
    <>
      {/* MAIN FOOTER */}
      <footer className="bg-[#EAF7F4]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-[#1F2937]">
            
            {/* MENU */}
            <div>
              <h4 className="font-semibold mb-4">Menu</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/shop" className="hover:underline">Shop</Link></li>
                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
  <Link to="/privacy-policy" className="hover:underline">
    Privacy Policy
  </Link>
</li>

                <li><Link to="/refund-Cancellation" className="hover:underline">Refund and Cancellation</Link></li>
               <li>
  <Link to="/refund-policy">Refund Policy</Link>
</li>
                <li><Link to="/shipping-policy" className="hover:underline">Shipping Policy</Link></li>
                <li><Link to="/terms" className="hover:underline">Terms & Condition</Link></li>
              </ul>
            </div>

            {/* SOCIAL MEDIA */}
            <div>
              <h4 className="font-semibold mb-4">Social Media</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Twitter</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">Pinterest</a></li>
              </ul>
            </div>

            {/* ADDRESS */}
            <div className="text-right md:text-left">
              <img
                src="/logo-footer.png"
                alt="Ebookspay"
                className="w-28 ml-auto md:ml-0 mb-4"
              />
              <p className="leading-relaxed">
                Spay Fintech <br/>
                316 Laxmi Plaza, Laxmi Industrial State, Andheri West,
                Mumbai, Maharashtra, 400053.
              </p>
            </div>

          </div>
        </div>
      </footer>

      {/* COPYRIGHT BAR */}
      <div className="bg-[#BFE9E1] py-4 text-center text-sm font-medium">
        Copyright © 2026 Ebookspay | Powered by Spay Fintech Pvt Ltd 
      </div>
    </>
  );
}
