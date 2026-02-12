import { NavLink, Outlet } from "react-router-dom";

const linkClass =
  "block px-6 py-4 border border-[#FFCDD2] text-[#FF1744] hover:bg-[#FFF1F2]";

const activeClass =
  "block px-6 py-4 border border-[#FF1744] bg-[#FFF1F2] font-semibold";

export default function MyAccountLayout() {

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token_type");

    // Full reload and redirect
    window.location.href = "/";
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10">
      
      {/* SIDEBAR */}
      <aside className="border border-[#FFCDD2]">

        <NavLink
          to="/my-account"
          end
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="orders"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Orders
        </NavLink>

        <NavLink
          to="downloads"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Downloads
        </NavLink>

        <NavLink
          to="account-details"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Change Password
        </NavLink>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`${linkClass} text-left w-full`}
        >
          Log out
        </button>

      </aside>

      {/* PAGE CONTENT */}
      <div>
        <Outlet />
      </div>
    </section>
  );
}
