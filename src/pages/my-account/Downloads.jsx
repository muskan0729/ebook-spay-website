import { useState } from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiDownload, FiFileText } from "react-icons/fi";
import { useGet } from "../../hooks/useGet";
import Loader from "../../components/Loader";

export default function Downloads() {
  const userId = localStorage.getItem("user_id");
  const { data, loading } = useGet(userId ? `user-downloads/${userId}` : null);
  
  const downloads = data?.data || [];
  const hasDownloads = downloads.length > 0;

  // Base URLs
  const IMAGE_BASE_URL = 'https://omishajewels.com/Backend/public/uploads/ebook-images/';
  const PDF_BASE_URL = 'https://omishajewels.com/Backend/public/uploads/ebook/';

  // Function to get correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL, extract just the filename
    if (imagePath.startsWith('http')) {
      const filename = imagePath.split('/').pop();
      return `${IMAGE_BASE_URL}${filename}`;
    }
    
    // Extract just the filename from the path
    const filename = imagePath.split('/').pop();
    return `${IMAGE_BASE_URL}${filename}`;
  };

  // Function to handle PDF download
  const handleDownload = (fileUrl, ebookTitle) => {
    console.log("Original file URL:", fileUrl);
    
    // Extract just the filename
    let filename = fileUrl;
    if (fileUrl.includes('/')) {
      const parts = fileUrl.split('/');
      filename = parts[parts.length - 1];
    }
    
    // Decode URL-encoded filename (like %20 for spaces)
    filename = decodeURIComponent(filename);
    
    // Construct the correct PDF URL
    const pdfUrl = `${PDF_BASE_URL}${filename}`;
    console.log("Downloading from:", pdfUrl);
    
    window.open(pdfUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <Loader />
      </div>
    );
  }

  if (!hasDownloads) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-3 bg-[#E4B95B] text-white px-6 py-4 rounded-sm max-w-3xl">
          <FiAlertCircle className="text-xl shrink-0" />
          <p className="text-sm font-medium">No downloads available yet.</p>
          <Link
            to="/shop"
            className="ml-auto text-sm font-semibold underline hover:opacity-90 transition"
          >
            BROWSE PRODUCTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6">My Downloads</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {downloads.map((ebook) => {
          const imageUrl = getImageUrl(ebook.image);
          
          return (
            <div
              key={ebook.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Book Cover Image */}
              <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={ebook.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log("Image failed to load:", imageUrl);
                      e.target.onerror = null;
                      // Use a more reliable placeholder
                      e.target.src = 'https://placehold.co/200x150/4b2c2c/white?text=No+Cover';
                    }}
                  />
                ) : (
                  <FiFileText className="text-gray-400 text-5xl" />
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {ebook.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {ebook.description || "No description available"}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Purchased: {new Date(ebook.purchased_at).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => handleDownload(ebook.file_url, ebook.title)}
                    className="flex items-center gap-2 bg-[#B8964E] hover:bg-[#9E7F42] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <FiDownload />
                    Download PDF
                  </button>
                </div>

                {/* Order number */}
                <p className="text-xs text-gray-400 mt-3">
                  Order: {ebook.order_no}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
