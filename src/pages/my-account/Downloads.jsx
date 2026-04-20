import { Link } from "react-router-dom";
import {
  FiAlertCircle,
  FiDownload,
  FiFileText,
  FiCalendar,
  FiShoppingBag,
} from "react-icons/fi";
import { useGet } from "../../hooks/useGet";
import Loader from "../../components/Loader";

export default function Downloads() {
  const userId = localStorage.getItem("user_id");

  const { data, loading, error } = useGet(
    userId ? `user-downloads/${userId}` : null
  );

  const downloads = Array.isArray(data?.data) ? data.data : [];
  const hasDownloads = downloads.length > 0;

  // ================= DOWNLOAD HANDLER =================
  const handleDownload = (fileUrl) => {
    if (!fileUrl) {
      alert("Download file not available.");
      return;
    }

    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="w-full flex justify-center py-16">
        <Loader />
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="w-full">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl">
          Failed to load downloads. Please refresh and try again.
        </div>
      </div>
    );
  }

  // ================= EMPTY =================
  if (!hasDownloads) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-r from-[#B8964E] to-[#9E7F42] text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <FiAlertCircle className="text-2xl" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-1">No Downloads Yet</h2>
            <p className="text-sm text-white/90">
              Once you purchase an ebook, it will appear here instantly.
            </p>
          </div>

          <Link
            to="/shop"
            className="bg-white text-[#8B6B2E] px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // ================= MAIN =================
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Downloads</h2>
        <p className="text-gray-500 mt-1">
          Access and download your purchased ebooks anytime.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {downloads.map((ebook, index) => {
          const imageUrl = ebook.image; // backend already sends full URL

          return (
            <div
              key={`${ebook.id}-${index}`}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* Cover */}
              <div className="h-52 bg-gray-100 overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={ebook.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/500x300/4b2c2c/white?text=No+Cover";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiFileText className="text-6xl text-gray-300" />
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {ebook.title}
                </h3>

                {/* Desc */}
                <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                  {ebook.description || "No description available."}
                </p>

                {/* Meta */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiCalendar />
                    Purchased:{" "}
                    {new Date(ebook.purchased_at).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiShoppingBag />
                    Order: {ebook.order_no}
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleDownload(ebook.file_url)}
                  className="w-full mt-5 bg-[#B8964E] hover:bg-[#9E7F42] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                >
                  <FiDownload />
                  Download PDF
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}