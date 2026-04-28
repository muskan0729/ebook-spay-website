import { FiX } from "react-icons/fi";

const OrderSummaryModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  // Supports all backend response formats
  const items =
    order?.ebooks ||
    order?.items ||
    order?.cart?.items ||
    [];

  const total =
    Number(order?.bill_amount) ||
    Number(order?.total_amount) ||
    Number(order?.total) ||
    0;

  const getImage = (item) => {
    return (
      item?.image ||
      item?.ebook?.image ||
      "https://via.placeholder.com/80x100?text=No+Cover"
    );
  };

  const getTitle = (item) => {
    return (
      item?.title ||
      item?.ebook?.title ||
      "Book"
    );
  };

  const getPrice = (item) => {
    return Number(
      item?.price ||
      item?.ebook?.price ||
      0
    );
  };

  const getQty = (item) => {
    return Number(item?.quantity || 1);
  };

  const getItemTotal = (item) => {
    return Number(
      item?.total ||
      item?.total_price ||
      getPrice(item) * getQty(item)
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const statusColor =
    order?.status === "completed"
      ? "bg-green-100 text-green-700"
      : order?.status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Order Details
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">

          {/* Order Info */}
          <div className="grid md:grid-cols-3 gap-6 text-sm">

            <div>
              <p className="text-gray-500 mb-1">
                Order Number
              </p>
              <p className="font-semibold">
                {order?.order_no || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Order Date
              </p>
              <p className="font-semibold">
                {formatDate(order?.created_at)}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Status
              </p>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
              >
                {order?.status || "unknown"}
              </span>
            </div>

          </div>

          {/* Books */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Purchased Books
            </h3>

            {items.length > 0 ? (
              <div className="space-y-4">

                {items.map((item, index) => {
                  const price = getPrice(item);
                  const qty = getQty(item);
                  const itemTotal = getItemTotal(item);

                  return (
                    <div
                      key={index}
                      className="flex gap-4 border rounded-xl p-4"
                    >

                      <img
                        src={getImage(item)}
                        alt={getTitle(item)}
                        className="w-20 h-28 object-cover rounded-lg border"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/80x100?text=No+Cover";
                        }}
                      />

                      <div className="flex-1">

                        <h4 className="font-semibold text-gray-800">
                          {getTitle(item)}
                        </h4>

                        <p className="text-sm text-gray-500 mt-2">
                          ₹{price.toLocaleString()} × {qty}
                        </p>

                        <p className="text-sm font-semibold text-[#B8964E] mt-2">
                          ₹{itemTotal.toLocaleString()}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No books found
              </p>
            )}
          </div>

          {/* Total */}
          <div className="border-t pt-5 flex justify-between items-center">

            <span className="text-lg font-semibold">
              Total Amount
            </span>

            <span className="text-2xl font-bold text-[#B8964E]">
              ₹{total.toLocaleString()}
            </span>

          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderSummaryModal;