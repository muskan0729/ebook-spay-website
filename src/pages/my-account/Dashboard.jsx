import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Hello <span className="font-bold">admin</span>{" "}
        (not admin?{" "}
        <Link
          to="/my-account/logout"
          className="text-red-500 hover:underline"
        >
          Log out
        </Link>
        )
      </h2>

      <p className="text-gray-700">
        From your account dashboard you can view your{" "}
        <Link
          to="/my-account/orders"
          className="text-red-500 hover:underline"
        >
          recent orders
        </Link>
        , manage your{" "}
        <Link
          to="/my-account/addresses"
          className="text-red-500 hover:underline"
        >
          shipping and billing addresses
        </Link>
        , and edit your{" "}
        <Link
          to="/my-account/account-details"
          className="text-red-500 hover:underline"
        >
          password and account details
        </Link>
        .
      </p>
    </div>
  );
}
