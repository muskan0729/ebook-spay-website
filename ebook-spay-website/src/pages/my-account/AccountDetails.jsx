import { useState } from "react";
import { usePost } from "../../hooks/usePost";

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState("");

  const { execute, loading, error } = usePost("change-password");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      alert("Please fill all fields");
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

      setSuccess("Password updated successfully.");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Change Password</h2>
        <p className="text-sm text-gray-500 mt-1">
          Update your account password below.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="space-y-4">

            <input
              type="password"
              name="currentPassword"
              placeholder="Current password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
            />

          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">
              {error.message || "Something went wrong"}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="text-sm text-green-600">
              {success}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </form>
      </div>

    </div>
  );
};

export default AccountDetails;
