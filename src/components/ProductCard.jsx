import React from 'react';

const ProductCard = ({ product }) => {
  // Format price with currency symbol - INDIAN RUPEES
  const formatPrice = (price) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `₹${numericPrice?.toLocaleString('en-IN') || 0}`;
  };

  // Fix image URL by replacing /storage/ with /public/
  const fixImageUrl = (url) => {
    if (!url) return null;
    return url.replace('/storage/', '/public/');
  };

  // Get first category name or return empty string
  const getCategoryName = () => {
    if (product.categories && product.categories.length > 0) {
      return product.categories[0].name;
    }
    return '';
  };

  const categoryName = getCategoryName();
  const fixedImageUrl = fixImageUrl(product.image);

  return (
    <div className="group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-200 h-full flex flex-col rounded-xl overflow-hidden">
      {/* Product Image - Optimized for full visibility */}
      <div className="relative pt-[75%] bg-gray-50 overflow-hidden">
        {fixedImageUrl ? (
          <img
            src={fixedImageUrl}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain p-4 md:p-6 group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
              const parent = e.target.parentElement;
              const placeholder = document.createElement('div');
              placeholder.className = 'absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100';
              placeholder.innerHTML = `
                <div class="text-center">
                  <div class="text-4xl text-gray-400 mb-2">📚</div>
                  ${categoryName ? `<div class="text-sm font-medium text-gray-500 uppercase tracking-wider">${categoryName}</div>` : ''}
                </div>
              `;
              parent.appendChild(placeholder);
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="text-4xl text-gray-400 mb-2">📚</div>
              {categoryName && (
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{categoryName}</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Product Details - Enhanced spacing and typography */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Title - Larger and more prominent */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] md:min-h-[4rem] leading-tight">
          {product.title}
        </h3>

        {/* Author/Category - Enhanced visibility */}
        {categoryName && categoryName.trim() !== '' && (
          <div className="mb-3">
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider bg-gray-100 px-3 py-1.5 rounded-full inline-block">
              {categoryName}
            </span>
          </div>
        )}

        {/* Pricing - Larger and bolder */}
        <div className="flex items-center mb-5 mt-auto">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>
        </div>

        {/* Add to Cart Button - Enhanced size and styling */}
        <button className="w-full bg-[#ff2d55] hover:bg-[#e0244a] text-white font-semibold py-3.5 px-6 text-base md:text-lg transition-all duration-200 flex items-center justify-center rounded-full shadow-md hover:shadow-xl transform hover:-translate-y-1">
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;