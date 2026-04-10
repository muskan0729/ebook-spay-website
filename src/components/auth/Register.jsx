import React, { useState } from "react";
import { usePost } from "../../hooks/usePost";
import { toast } from "sonner";

const Register = ({ switchToLogin, onSuccess }) => {
  const { execute, loading } = usePost("register");

  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [formErrors, setFormErrors] = useState({});

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });

    // clear error on typing
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    let errors = {};

    if (!formdata.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formdata.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      errors.email = "Enter a valid email";
    }

    if (!formdata.password) {
      errors.password = "Password is required";
    } else if (formdata.password.length < 6) {
      errors.password = "Minimum 6 characters required";
    }

    if (!formdata.password_confirmation) {
      errors.password_confirmation = "Confirm your password";
    } else if (formdata.password !== formdata.password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }

    return errors;
  };

  /* ================= REGISTER ================= */
  const handleRegister = async (e) => {
    e.preventDefault();

    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix form errors");
      return;
    }

    try {
      const res = await execute(formdata);

      // 🚨 Ensure backend response is correct
      if (!res || !res.access_token) {
        throw new Error(res?.message || "Registration failed");
      }

      /* ================= STORE TOKEN ================= */
      localStorage.setItem("token", res.access_token);

      /* ================= STORE USER ================= */
      const userData = {
        id: res.user_id ?? null,
        name: res.name ?? formdata.name,   // fallback (important)
        email: res.email ?? formdata.email,
        role: res.role || "user",
      };

      localStorage.setItem("user", JSON.stringify(userData));

      /* ================= SUCCESS ================= */
      toast.success("Registered successfully 🎉");

      // close sidebar or update UI
      onSuccess?.(res);

      if (!onSuccess) {
        switchToLogin();
      }

    } catch (err) {
      console.error("Register error:", err);

      // Laravel validation errors
      if (err?.errors) {
        setFormErrors(err.errors);
      }

      toast.error(
        err?.message ||
        err?.error ||
        "Registration failed (try new email)"
      );
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <form className="space-y-5" onSubmit={handleRegister}>

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            name="name"
            value={formdata.name}
            onChange={handleChange}
            className={`mt-1 w-full border px-3 py-2 rounded ${
              formErrors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            className={`mt-1 w-full border px-3 py-2 rounded ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            className={`mt-1 w-full border px-3 py-2 rounded ${
              formErrors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="block text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="password_confirmation"
            value={formdata.password_confirmation}
            onChange={handleChange}
            className={`mt-1 w-full border px-3 py-2 rounded ${
              formErrors.password_confirmation
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formErrors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.password_confirmation}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2.5 rounded disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="my-6 h-px bg-gray-200" />

      <div className="text-center">
        <button
          onClick={switchToLogin}
          className="text-sm font-medium hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </>
  );
};

export default Register;