import React, { useState } from "react";
import { usePost } from "../hooks/usePost";
import { syncGuestData } from "../utils/syncGuestData";
import { useNavigate } from "react-router-dom";

const Login = ({ switchToRegister, onSuccess }) => {
  const { execute, loading, error } = usePost("login");
  const { execute: cartSyncExecute } = usePost("cart/add");
  const { execute: wishlistSyncExecute } = usePost("wishlist");

  const navigate = useNavigate();

  // 🔐 Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  // 📝 Form state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔑 Login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await execute(form);

      // Save token
      localStorage.setItem("token", res.access_token);

      if (res.user_id) {
        localStorage.setItem("user_id", res.user_id);
      }

      // Save user basic data
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.user_id,
          name: res.name || "User",
          email: form.email,
        })
      );

      // If full user object exists, overwrite
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
        setUser(res.user);
      } else {
        setUser({
          id: res.user_id,
          name: res.name || "User",
          email: form.email,
        });
      }

      // Sync guest cart & wishlist
      await syncGuestData(cartSyncExecute, wishlistSyncExecute);

      // Update login state
      setIsLoggedIn(true);

      // Close sidebar
      onSuccess?.(res);

      // Redirect to My Account
      navigate("/");

    } catch (err) {
      console.error("Login failed", err);
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");

    setIsLoggedIn(false);
    setUser(null);

  window.location.href = "/";

  };

  return (
    <>
  <div className="w-full max-w-md bg-white p-8 ">

    {/* Header */}

    <form className="space-y-5" onSubmit={handleSubmit}>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Email Address
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          className="
            w-full
            border border-gray-300
            rounded-xl
            px-4 py-3
            focus:outline-none
            focus:ring-2
            focus:ring-[#B8964E]
            focus:border-transparent
            transition
          "
          placeholder="you@example.com"
          required
        />
      </div>

      {/* Password */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          {/* <button
            type="button"
            className="text-xs text-gray-400 hover:text-[#B8964E]"
          >
            Forgot?
          </button> */}
        </div>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="
            w-full
            border border-gray-300
            rounded-xl
            px-4 py-3
            focus:outline-none
            focus:ring-2
            focus:ring-[#B8964E]
            focus:border-transparent
            transition
          "
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
          {error.message || error}
        </div>
      )}

      {/* Submit */}
      <button
        disabled={loading}
        className="
          w-full
          bg-black
          text-white
          py-3
          rounded-xl
          font-medium
          hover:bg-gray-900
          transition
          disabled:opacity-60
        "
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>

    {/* Divider */}
    <div className="my-6 flex items-center gap-3">
      <div className="flex-1 h-px bg-gray-200"></div>
      <span className="text-xs text-gray-400">OR</span>
      <div className="flex-1 h-px bg-gray-200"></div>
    </div>

    {/* Register */}
    <div className="text-center">
      <p className="text-sm text-gray-500">
        Don’t have an account?
      </p>
      <button
        type="button"
        onClick={switchToRegister}
        className="mt-2 text-sm font-medium text-[#B8964E] hover:underline"
      >
        Create Account
      </button>
    </div>

  </div>
</>

  );
};

export default Login;
