import { useState } from "react";
import { useGet } from "../../hooks/useGet";
import { useDelete } from "../../hooks/useDelete";

export default function Orders() {
  const { data, loading, refetch } = useGet("admin/orders");
  const { execute: remove, loading: deleting } = useDelete();

  const orders = Array.isArray(data) ? data : [];

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all"
        ? true
        : (order.status || "").toLowerCase() ===
          statusFilter.toLowerCase();

    const keyword = search.toLowerCase();

    const matchesSearch =
      (order.order_no || "")
        .toLowerCase()
        .includes(keyword) ||
      (order.user?.name || "")
        .toLowerCase()
        .includes(keyword) ||
      (order.user?.email || "")
        .toLowerCase()
        .includes(keyword) ||
      (order.bill_amount || "")
        .toString()
        .includes(keyword);

    return matchesStatus && matchesSearch;
  });

  const handleDelete = async (order) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${order.order_no}?`
      )
    ) {
      await remove(`/admin/orders/${order.id}`, {
        onSuccess: refetch,
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "completed":
      case "paid":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const totalRevenue = orders.reduce(
    (sum, item) => sum + Number(item.bill_amount || 0),
    0
  );

  return (
    <div className="bg-[#F7F6F3] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-[#2E2E2E]">
              Orders
            </h1>

            <p className="text-sm text-[#6B6B6B] mt-2">
              View and manage all customer orders.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9E4DA] px-6 py-4 flex gap-8 shadow-sm">
            <div>
              <p className="text-xs text-gray-500 uppercase">
                Total Orders
              </p>
              <p className="text-2xl font-semibold">
                {orders.length}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase">
                Revenue
              </p>
              <p className="text-2xl font-semibold">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white border border-[#E9E4DA] rounded-2xl p-6 mb-8 shadow-sm grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search by Order ID / Name / Email / Amount"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 rounded-xl border border-[#E9E4DA] text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 md:col-span-2"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-[#E9E4DA] text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
          >
            <option value="all">All Orders</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E9E4DA] rounded-3xl shadow-sm overflow-hidden">

          <div className="px-8 py-6 border-b border-[#E9E4DA] flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              All Orders
            </h2>

            <button
              onClick={refetch}
              className="text-sm text-blue-600 hover:underline"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20 text-center text-sm text-gray-500">
                Loading orders...
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="py-20 text-center text-sm text-gray-500">
                No orders found
              </div>
            ) : (
              <table className="min-w-full text-sm">
                <thead className="bg-[#FAF9F7] border-b border-[#E9E4DA]">
                  <tr>
                    <th className="px-6 py-4 text-left">Order ID</th>
                    <th className="px-6 py-4 text-left">Customer</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Payment</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-[#E9E4DA] hover:bg-[#FAF9F7]"
                    >
                      <td className="px-6 py-5 font-medium">
                        {order.order_no}
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-medium">
                          {order.user?.name || "Guest"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.user?.email || "-"}
                        </p>
                      </td>

                      <td className="px-6 py-5 font-semibold">
                        ₹
                        {Number(
                          order.bill_amount || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                          Online
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-xs text-gray-500">
                        {formatDate(order.created_at)}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => handleDelete(order)}
                          disabled={deleting}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {filteredOrders.length > 0 && (
            <div className="px-8 py-4 bg-[#FAF9F7] text-sm text-gray-500 border-t border-[#E9E4DA]">
              Showing {filteredOrders.length} orders
            </div>
          )}
        </div>
      </div>
    </div>
  );
}