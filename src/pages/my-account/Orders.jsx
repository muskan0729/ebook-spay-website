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
  <div className="space-y-6">

    {/* Header */}
    <div>
      <h2 className="text-2xl font-semibold">My Orders</h2>
      <p className="text-sm text-gray-500 mt-1">
        View and track all your recent purchases.
      </p>
    </div>

    {/* Not Logged In */}
    {!userId && (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
        Please login to view your orders.
      </div>
    )}

    {userId && (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">Order</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Total</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}

            {orders.map((order) => {

              const statusColor =
                order.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600";

              return (
                <tr key={order.id} className="hover:bg-gray-50 transition">

                  {/* Order Number */}
                  <td className="px-6 py-4 font-medium text-black">
                    #{order.order_no}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(order.created_at)}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColor}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 font-semibold text-black">
                    ₹{order.bill_amount}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/order-details/${order.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-black hover:underline"
                    >
                      View
                    </Link>
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>
    )}

    {error && (
      <div className="text-center text-red-500 text-sm">
        {error.message || "Something went wrong"}
      </div>
    )}

  </div>
);

}
