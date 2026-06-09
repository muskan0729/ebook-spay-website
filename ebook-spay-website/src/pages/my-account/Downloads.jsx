import { Link } from "react-router-dom";
import {
  FiAlertCircle,
  FiDownload,
  FiFileText,
  FiCalendar,
} from "react-icons/fi";
import { useGet } from "../../hooks/useGet";
import Loader from "../../components/Loader";

export default function Downloads() {
  const userId = localStorage.getItem("user_id");

  const { data, loading, error } = useGet(
    userId ? `user-downloads/${userId}` : null
  );

  const downloads = Array.isArray(data?.data)
    ? data.data
    : [];

  const hasDownloads = downloads.length > 0;

  const handleDownload = (fileUrl) => {
    if (!fileUrl) {
      alert("Download unavailable");
      return;
    }

    window.location.href = fileUrl;
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-16">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Failed to load downloads
      </div>
    );
  }

  if (!hasDownloads) {
    return (
      <div className="bg-[#B8964E] text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold">
          No Downloads Yet
        </h2>

        <Link to="/shop" className="underline mt-4 block">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">
        My Downloads
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {downloads.map((ebook) => (
          <div
            key={ebook.id}
            className="bg-white rounded-xl shadow border overflow-hidden"
          >
            <div className="h-52 bg-gray-100">
              {ebook.image ? (
                <img
                  src={ebook.image}
                  alt={ebook.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex justify-center items-center">
                  <FiFileText size={50} />
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-lg">
                {ebook.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {ebook.description}
              </p>

              <p className="text-sm mt-3 flex gap-2 items-center">
                <FiCalendar />
                {new Date(
                  ebook.purchased_at
                ).toLocaleDateString("en-IN")}
              </p>

              <button
                onClick={() =>
                  handleDownload(
                    ebook.file_url
                  )
                }
                className="w-full mt-5 bg-[#B8964E] text-white py-3 rounded-xl flex justify-center gap-2 items-center"
              >
                <FiDownload />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}