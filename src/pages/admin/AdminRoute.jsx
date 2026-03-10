import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If logged in but NOT admin
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Allow admin access
  return <Outlet />;
}