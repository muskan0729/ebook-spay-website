import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiSearch, FiShoppingCart } from "react-icons/fi";
import logo from "../../images/logo.png";
import AuthSidebar from "../../auth/AuthSidebar";
import SearchOverlay from "../../components/common/SearchOverlay";
import CartDrawer from "../cart/CartDrawer";

const Header = ({ openLogin }) => {
  const navigate = useNavigate();

  const [authOpen, setAuthOpen] = useState(false);
  const [view, setView] = useState("login");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleUserClick = () => {
    if (token) {
      navigate("/my-account");
    } else {
      setView("login");
      setAuthOpen(true);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex flex-col items-start">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
            <span className="text-sm font-medium text-gray-900 mt-1">
              &nbsp;&nbsp;&nbsp; Spay Fintech
            </span>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[#2E2E2E]">
            {["/", "/shop", "/about", "/contact"].map((path, i) => {
              const labels = ["HOME", "SHOP", "ABOUT US", "CONTACT US"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `relative pb-1 transition-all
                    ${
                      isActive
                        ? "text-[#B8964E] after:w-full"
                        : "after:w-0 hover:after:w-full"
                    }
                    after:absolute after:left-0 after:-bottom-1
                    after:h-[1px] after:bg-[#B8964E]
                    after:transition-all after:duration-300`
                  }
                >
                  {labels[i]}
                </NavLink>
              );
            })}
          </nav>

          {/* ICONS */}
          <div className="flex items-center gap-6 text-[#2E2E2E]">

            {/* SEARCH */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-xl hover:text-[#B8964E] transition"
            >
              <FiSearch />
            </button>

            {/* USER */}
            <button
              onClick={handleUserClick}
              className="text-xl hover:text-[#B8964E] transition cursor-pointer"
            >
              <FiUser />
            </button>

            {/* CART */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex flex-col items-center text-sm hover:text-[#B8964E] transition"
            >
              <FiShoppingCart className="text-xl" />
              <span className="font-medium">₹0.00</span>
            </button>

          </div>
        </div>
      </header>

      {/* AUTH */}
      <AuthSidebar
        open={authOpen}
        setOpen={setAuthOpen}
        view={view}
        setView={setView}
      />

      {/* SEARCH */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* CART DRAWER */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}   // ✅ FIXED
        openLogin={openLogin}
      />
    </>
  );
};

export default Header;
