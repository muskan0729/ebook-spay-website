import { useState } from "react";
import { usePost } from "../../hooks/usePost";

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "Admin",
    lastName: "User",
    displayName: "admin",
    email: "admin@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { execute, loading, error } = usePost("change-password");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.newPassword || !formData.confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await execute({
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirmation: formData.confirmPassword,
      });

      alert("Password changed successfully");

      // Reset password fields only
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <h1 className="text-4xl font-serif mb-8">Change Password</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">

        {/* Email */}
        {/* Password Change */}
        <fieldset className="border border-[#F4B7B7] p-6 space-y-4">
          <legend className="font-medium px-2">
            Password change
          </legend>

          <input
            type="password"
            name="currentPassword"
            placeholder="Current password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full border border-[#F4B7B7] px-4 py-3 focus:outline-none"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border border-[#F4B7B7] px-4 py-3 focus:outline-none"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-[#F4B7B7] px-4 py-3 focus:outline-none"
          />
        </fieldset>

        {error && (
          <p className="text-red-500 text-sm">
            {error.message || "Something went wrong"}
          </p>
        )}

        {/* Save Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#FF2D55] text-white px-10 py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </section>
  );
};

export default AccountDetails;
