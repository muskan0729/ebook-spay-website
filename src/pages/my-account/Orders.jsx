const orders = [
  { id: "#1254", date: "January 31, 2026", status: "Failed", total: "₹14,010.00 for 2 items" },
  { id: "#1249", date: "January 29, 2026", status: "Cancelled", total: "₹14,010.00 for 2 items" },
  { id: "#1179", date: "January 8, 2026", status: "Processing", total: "₹10.00 for 1 item" },
];

export default function Orders() {
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
        {orders.map(order => (
          <tr key={order.id}>
            <td className="p-3 border text-red-500">{order.id}</td>
            <td className="p-3 border">{order.date}</td>
            <td className="p-3 border">{order.status}</td>
            <td className="p-3 border text-red-500">{order.total}</td>
            <td className="p-3 border">
              <button className="bg-[#FF1744] text-white px-6 py-2 rounded-full">
                VIEW
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
