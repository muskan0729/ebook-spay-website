import React, { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useGet } from "../hooks/useGet";
import bannerImage from "../images/banner.jpg";

const ShopPage = () => {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting
  const [sortOption, setSortOption] = useState("default");

  // Fetch products
  const { data: productsData, loading, error, refetch } = useGet(
    currentPage ? `products?page=${currentPage}` : null
  );

  // Extract products and pagination meta safely
  const productsArray = productsData?.data?.data || [];
  const paginationMeta = productsData?.data || {};

  // Memoized sorted products
  const sortedProducts = useMemo(() => {
    if (!Array.isArray(productsArray)) return [];

    const sorted = [...productsArray];

    switch (sortOption) {
      case "popularity":
        return sorted.sort((a, b) => b.id - a.id);

      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      case "latest":
        return sorted.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

      case "price-low-high":
        return sorted.sort(
          (a, b) =>
            (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0)
        );

      case "price-high-low":
        return sorted.sort(
          (a, b) =>
            (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0)
        );

      case "alphabetical-az":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));

      case "alphabetical-za":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));

      default:
        return sorted;
    }
  }, [productsArray, sortOption]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Banner title="Shop" image={bannerImage} height="500px" />
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-20 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-6"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Banner title="Shop" image={bannerImage} height="500px" />
        <ErrorMessage message={error} refetch={refetch} />
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen bg-white">
      <Banner title="Shop" image={bannerImage} height="350px md:500px" />
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-8 md:py-12">
        {/* Results and Sorting */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12">
          <ResultsCount meta={paginationMeta} />
          <SortDropdown value={sortOption} onChange={setSortOption} />
        </div>

        {/* Products Grid - Optimized for larger cards */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <NoProducts />
        )}

        {/* Pagination */}
        {paginationMeta?.last_page > 1 && (
          <Pagination
            meta={paginationMeta}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ShopPage;

/* ---------------- Helper Components ---------------- */

const Banner = ({ title, image, height }) => (
  <div
    className="relative bg-gray-400 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image})`,
      backgroundBlendMode: "overlay",
      height: height,
    }}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h1>
        <nav className="flex items-center justify-center text-base text-gray-300">
          <a
            href="/"
            className="hover:text-white transition-colors duration-200 inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Home
          </a>
          <span className="mx-3 text-gray-400">›</span>
          <span className="text-white font-medium">{title}</span>
        </nav>
      </div>
    </div>
  </div>
);

const ResultsCount = ({ meta }) => (
  <div className="order-2 md:order-1">
    <p className="text-gray-700">
      Showing{" "}
      <span className="font-semibold">{meta.from || 0}</span> -{" "}
      <span className="font-semibold">{meta.to || 0}</span> of{" "}
      <span className="font-semibold">{meta.total || 0}</span> results
    </p>
  </div>
);

const SortDropdown = ({ value, onChange }) => (
  <div className="order-1 md:order-2 w-full md:w-auto">
    <div className="relative inline-block w-full md:w-64">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 text-sm md:text-base shadow-sm hover:border-gray-400 transition-colors"
      >
        <option value="default">Default sorting</option>
        <option value="popularity">Sort by popularity</option>
        <option value="rating">Sort by average rating</option>
        <option value="latest">Sort by latest</option>
        <option value="price-low-high">Sort by price: low to high</option>
        <option value="price-high-low">Sort by price: high to low</option>
        <option value="alphabetical-az">Alphabetical: A-Z</option>
        <option value="alphabetical-za">Alphabetical: Z-A</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
  </div>
);

const NoProducts = () => (
  <div className="text-center py-20">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg
        className="w-10 h-10 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        ></path>
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">No Products Found</h3>
    <p className="text-gray-600 max-w-md mx-auto">
      We couldn't find any products matching your criteria. Please check back
      later for new arrivals!
    </p>
  </div>
);

const ErrorMessage = ({ message, refetch }) => (
  <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-20">
    <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto text-center">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Error Loading Products
      </h3>
      <p className="text-red-700 mb-6">{message}</p>
      <button
        onClick={refetch}
        className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

const Pagination = ({ meta, currentPage, setCurrentPage }) => {
  const lastPage = meta.last_page || 1;

  const pageNumbers = [...Array(lastPage)].map((_, i) => i + 1);

  return (
    <div className="mt-16 flex justify-center">
      <nav
        className="flex flex-wrap items-center justify-center gap-2"
        aria-label="Pagination"
      >
        <button
          className="px-4 py-2.5 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-w-[100px]"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr; Previous
        </button>

        {pageNumbers.map((pageNum) => {
          if (
            pageNum === 1 ||
            pageNum === lastPage ||
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2.5 text-sm font-medium border rounded-lg transition-colors min-w-[44px] ${
                  currentPage === pageNum
                    ? "border-gray-900 bg-gray-900 text-white hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? "page" : undefined}
              >
                {pageNum}
              </button>
            );
          } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
            return (
              <span key={pageNum} className="px-2 text-gray-500">
                ...
              </span>
            );
          }
          return null;
        })}

        <button
          className="px-4 py-2.5 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-w-[100px]"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= lastPage}
        >
          Next &rarr;
        </button>
      </nav>
    </div>
  );
};