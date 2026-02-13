import { Link } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import Loader from "../../components/Loader";

export default function Orders() {
  const userId = localStorage.getItem("user_id");

  const { data, loading, error } = useGet(
    userId ? `order-history/${userId}` : null
  );

  const orders = Array.isArray(data?.data) ? data.data : [];

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (!userId) {
    return (
      <p className="text-center py-10 text-gray-500">
        Please login to view your orders.
      </p>
    );
  }

  return (
    <table className="w-full border border-[#FFCDD2] text-sm">
      <thead className="bg-[#FFF1F2]">
        <tr>
          <th className="p-3 border">Order</th>
          <th className="p-3 border">Date</th>
          <th className="p-3 border">Status</th>
          <th className="p-3 border">Total</th>
          <th className="p-3 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {orders.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center p-6 text-gray-500">
              No orders found.
            </td>
          </tr>
        )}

        {orders.map((order) => (
          <tr key={order.id}>
            {/* Order Number */}
            <td className="p-3 border text-red-500">
              #{order.order_no}
            </td>

            {/* Date */}
            <td className="p-3 border">
              {formatDate(order.created_at)}
            </td>

            {/* Status */}
            <td className="p-3 border capitalize">
              {order.status}
            </td>

            {/* Total */}
            <td className="p-3 border text-red-500">
              ₹{order.bill_amount}
            </td>

            {/* Actions */}
            <td className="p-3 border">
              <Link
                to={`/order-details/${order.id}`}
                className="bg-[#FF1744] text-white px-6 py-2 rounded-full inline-block text-center"
              >
                VIEW
              </Link>
            </td>
          </tr>
        ))}
      </tbody>

      {error && (
        <tfoot>
          <tr>
            <td colSpan="5" className="text-center text-red-500 p-4">
              {error.message || "Something went wrong"}
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
