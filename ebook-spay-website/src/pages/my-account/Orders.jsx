import { useState } from "react";
import { useGet } from "../../hooks/useGet";
import Loader from "../../components/Loader";
import OrderSummaryModal from "../../components/OrderSummaryModal";

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = localStorage.getItem("user_id");

  const { data, loading, error } = useGet(
    userId ? `order-history/${userId}` : null
  );

  const orders = Array.isArray(data?.data)
    ? data.data
    : [];

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  const getTotal = (order) => {
    return Number(
      order?.bill_amount ||
      order?.total_amount ||
      order?.total ||
      0
    );
  };

  const openOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getStatusClass = (status) => {
    if (status === "completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  if (loading) return <Loader />;

  return (
    <div>

      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-5 gap-4 border-b pb-3 mb-6 text-sm font-semibold uppercase tracking-wide text-gray-600">
        <div>Order</div>
        <div>Date</div>
        <div>Status</div>
        <div>Total</div>
        <div>Actions</div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-center py-10 text-red-500">
          Failed to load orders
        </div>
      )}

      {/* Orders */}
      {!error && (
        <div className="space-y-6">

          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start md:items-center border rounded-xl md:border-0 md:border-b p-4 md:p-0 md:pb-6"
              >

                {/* Order Number */}
                <div>
                  <p className="md:hidden text-xs text-gray-500 mb-1">
                    Order
                  </p>

                  <p className="font-medium break-all">
                    {order?.order_no || "-"}
                  </p>
                </div>

                {/* Date */}
                <div>
                  <p className="md:hidden text-xs text-gray-500 mb-1">
                    Date
                  </p>

                  <p>
                    {formatDate(order?.created_at)}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="md:hidden text-xs text-gray-500 mb-1">
                    Status
                  </p>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                      order?.status
                    )}`}
                  >
                    {order?.status || "unknown"}
                  </span>
                </div>

                {/* Total */}
                <div>
                  <p className="md:hidden text-xs text-gray-500 mb-1">
                    Total
                  </p>

                  <p className="font-semibold text-[#B8964E]">
                    ₹{getTotal(order).toLocaleString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">

                  {order?.canPay && (
                    <button className="px-4 py-2 rounded-full bg-[#B8964E] text-white text-xs font-medium hover:opacity-90 transition">
                      PAY
                    </button>
                  )}

                  <button
                    onClick={() => openOrder(order)}
                    className="px-4 py-2 rounded-full bg-[#B8964E] text-white text-xs font-medium hover:opacity-90 transition"
                  >
                    VIEW
                  </button>

                  {order?.canCancel && (
                    <button className="px-4 py-2 rounded-full bg-red-500 text-white text-xs font-medium hover:opacity-90 transition">
                      CANCEL
                    </button>
                  )}

                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-14 text-gray-500">
              No Orders Found
            </div>
          )}

        </div>
      )}

      {/* Modal */}
      <OrderSummaryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        order={selectedOrder}
      />

    </div>
  );
}