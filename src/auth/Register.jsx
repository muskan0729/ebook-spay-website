import React, { useState } from "react";
import { usePost } from "../hooks/usePost.jsx";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = ({ switchToLogin, onSuccess }) => {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const { loading, execute } = usePost("register");

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const validate = () => {
    let errors = {};

    if (!formdata.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formdata.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formdata.password.trim()) {
      errors.password = "Password is required";
    } else if (formdata.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formdata.password_confirmation.trim()) {
      errors.password_confirmation = "Confirm password is required";
    } else if (formdata.password !== formdata.password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors");
      return;
    }

    try {
      const res = await execute(formdata);

      // Save token
      if (res?.access_token) {
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("token_type", res.token_type);
      }

      toast.success("Registered successfully 🎉");

      // ✅ Redirect FIRST
      navigate("/");

      // ✅ Then close sidebar
      onSuccess?.();

    } catch (err) {
      console.log("Backend error:", err);

      if (err?.errors) {
        setFormErrors(err.errors);
        toast.error("Validation error", {
          description: "Please check the form fields",
        });
      } else {
        toast.error("Something went wrong ❌");
      }
    }
  };

 return (
  <div className="w-full max-w-md mx-auto bg-white p-6 ">

    <form className="space-y-4" onSubmit={handleRegister}>

      {/* Full Name */}
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-600">
          Full Name
        </label>
        <input
          name="name"
          value={formdata.name}
          onChange={handleChange}
          placeholder="John Doe"
          className={`
            w-full px-3 py-2.5 rounded-lg border text-sm
            focus:outline-none focus:ring-2 focus:ring-[#B8964E]
            transition
            ${formErrors.name ? "border-red-500" : "border-gray-300"}
          `}
        />
        {formErrors.name && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-600">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formdata.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`
            w-full px-3 py-2.5 rounded-lg border text-sm
            focus:outline-none focus:ring-2 focus:ring-[#B8964E]
            transition
            ${formErrors.email ? "border-red-500" : "border-gray-300"}
          `}
        />
        {formErrors.email && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-600">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formdata.password}
          onChange={handleChange}
          placeholder="Minimum 6 characters"
          className={`
            w-full px-3 py-2.5 rounded-lg border text-sm
            focus:outline-none focus:ring-2 focus:ring-[#B8964E]
            transition
            ${formErrors.password ? "border-red-500" : "border-gray-300"}
          `}
        />
        {formErrors.password && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-600">
          Confirm Password
        </label>
        <input
          type="password"
          name="password_confirmation"
          value={formdata.password_confirmation}
          onChange={handleChange}
          placeholder="Re-enter password"
          className={`
            w-full px-3 py-2.5 rounded-lg border text-sm
            focus:outline-none focus:ring-2 focus:ring-[#B8964E]
            transition
            ${
              formErrors.password_confirmation
                ? "border-red-500"
                : "border-gray-300"
            }
          `}
        />
        {formErrors.password_confirmation && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.password_confirmation}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full py-2.5 rounded-lg font-medium text-sm
          bg-black text-white
          hover:bg-gray-900 transition
          disabled:opacity-60
        "
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>

    {/* Compact Divider */}
    <div className="my-4 flex items-center gap-2">
      <div className="flex-1 h-px bg-gray-200"></div>
      <span className="text-[10px] text-gray-400">OR</span>
      <div className="flex-1 h-px bg-gray-200"></div>
    </div>

    {/* Switch */}
    <div className="text-center">
      <button
        onClick={switchToLogin}
        className="text-xs font-medium text-[#B8964E] hover:underline"
      >
        Already have an account? Sign In
      </button>
    </div>

  </div>
);


};

export default Register;
