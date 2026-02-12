import { useState } from "react";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // later you will connect API here
    console.log("Account Details Updated:", formData);
    alert("Account details saved (UI only)");
  };

  return (
    <section>
      <h1 className="text-4xl font-serif mb-8">Change Password </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">


        {/* Email */}
        <div>
          <label className="block mb-2 font-medium">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#F4B7B7] px-4 py-3 focus:outline-none"
            required
          />
        </div>

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

        {/* Save Button */}
        <button
          type="submit"
          className="bg-[#FF2D55] text-white px-10 py-3 rounded-full font-semibold hover:opacity-90"
        >
          Save changes
        </button>
      </form>
    </section>
  );
};

export default AccountDetails;
