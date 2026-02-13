import { Link } from "react-router-dom";

export default function Downloads() {

  // Dummy downloadable items
  const downloads = [
    {
      id: 1,
      product: "Premium UI Kit",
      order: "#1023",
      date: "2025-01-12",
      file: "/files/ui-kit.zip",
    },
    {
      id: 2,
      product: "React Admin Template",
      order: "#1018",
      date: "2025-01-05",
      file: "/files/admin-template.zip",
    },
  ];

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">My Downloads</h2>
        <p className="text-sm text-gray-500 mt-1">
          Access your purchased digital products.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        {downloads.length === 0 ? (
          <div className="p-10 text-center text-gray-500 space-y-4">
            <p>No downloads available yet.</p>
            <Link
              to="/shop"
              className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4 text-left">Order</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-right">Download</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {downloads.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">

                  <td className="px-6 py-4 font-medium text-black">
                    {item.product}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {item.order}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(item.date)}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <a
                      href={item.file}
                      download
                      className="inline-flex items-center text-sm font-medium text-black hover:underline"
                    >
                      Download
                    </a>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}
