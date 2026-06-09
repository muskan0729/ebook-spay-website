import { NavLink, Outlet } from "react-router-dom";
import { FiUser, FiPackage, FiDownload, FiLock, FiLogOut } from "react-icons/fi";

export default function MyAccountLayout() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token_type");

    window.location.href = "/";
  };

  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition";

  const activeLink =
    "bg-black text-white";

  const inactiveLink =
    "text-gray-600 hover:bg-gray-100";

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">

        {/* SIDEBAR */}
        <aside className="bg-white border border-gray-200 rounded-xl shadow-sm">

          {/* User Info */}
          <div className="p-5 border-b border-gray-100 flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <p className="text-sm font-semibold">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || ""}
              </p>
            </div>

          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1">

            <NavLink
              to="/my-account"
              end
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <FiUser size={16} />
              Dashboard
            </NavLink>

            <NavLink
              to="orders"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <FiPackage size={16} />
              Orders
            </NavLink>

            <NavLink
              to="downloads"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <FiDownload size={16} />
              Downloads
            </NavLink>

            <NavLink
              to="account-details"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <FiLock size={16} />
              Change Password
            </NavLink>

          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 w-full transition"
            >
              <FiLogOut size={16} />
              Log out
            </button>
          </div>

        </aside>

        {/* CONTENT */}
        <main className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 min-h-[500px]">
          <Outlet />
        </main>

      </div>

    </section>
  );
}
