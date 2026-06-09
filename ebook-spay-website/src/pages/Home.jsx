import { Link } from "react-router-dom";
import heroImg from "../assets/images/hero-books.jpg";
import exploreImg from "../assets/images/explore-books.jpg";
import magicBg from "../assets/images/magic-bg.jpg";
import magicTopImg from "../assets/images/magic-top.jpg";
import testimonialBg from "../assets/images/testimonial-bg.jpg";
import expandBg from "../assets/images/expand-mind-bg.jpg";

import BookCard from "../components/books/BookCard";
import { useGet } from "../hooks/useGet";

const Home = () => {
  // 🔥 YOUR EXISTING HOOK
  const { data, loading, error } = useGet("products");

  const products = data?.data?.data ?? [];

  return (
    <>
      {/* ================= FIXED HERO ================= */}
      <section
        className="relative h-[90vh] w-full bg-center bg-cover bg-no-repeat bg-fixed flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-[#5C4A3A]/45"></div>

        <div className="relative z-10 text-center px-6 text-white max-w-4xl">
          <p className="text-xs tracking-[0.35em] uppercase mb-6 opacity-90">
            Casual & Everyday
          </p>

          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl leading-tight">
            Where Every Book Finds Its <br />
            <span className="italic">Reader</span>
          </h1>

          <p className="mt-6 text-sm md:text-base opacity-90">
            Stay ahead with the books everyone is reading right now.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-10 px-12 py-3 rounded-full bg-[#D6B24A] text-white text-sm tracking-widest hover:bg-[#c4a23f] transition"
          >
            EXPLORE
          </Link>
        </div>
      </section>

      {/* ================= MOST POPULAR ================= */}
      <section className="bg-[#FEFCF9] pt-20 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-['Playfair_Display'] text-[#2E2E2E] mb-14 text-center">
            Most Popular
          </h2>

          {/* LOADING */}
          {loading && (
            <p className="text-center text-gray-500">Loading products...</p>
          )}

          {/* ERROR */}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* PRODUCTS */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 cursor-pointer">
              {products.slice(0, 8).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="text-center text-gray-400">No products found</p>
          )}
        </div>
      </section>

      {/* ================= EXPLORE BOOKS SECTION ================= */}
      <section className="bg-white pt-0 py-28">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-6">
              Explore the world of books
            </p>

            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1F1F1F] leading-tight">
              Discover Your Next <br />
              <span className="italic">Great Read</span>
            </h2>

            <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
              From timeless classics to the latest bestsellers, we bring
              thousands of books right to your fingertips. Explore genres,
              authors, and curated collections that inspire, entertain, and
              educate.
            </p>

            <Link
              to="/shop"
              className="
                inline-block
                mt-10
                px-12
                py-4
                rounded-full
                bg-[#D6B24A]
                text-white
                text-sm
                tracking-widest
                hover:bg-[#c4a23f]
                transition
              "
            >
              BROWSE BOOKS
            </Link>
          </div>

          <div className="relative">
            <img
              src={exploreImg}
              alt="Explore books"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* ================= MAGIC OF READING (WITH TOP IMAGE) ================= */}
      <section
        className="relative h-[105vh] w-full bg-center bg-cover bg-no-repeat bg-fixed flex items-center"
        style={{ backgroundImage: `url(${magicBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl text-white">
            {/* 🔥 TOP FLOATING IMAGE */}
            <div className="mb-8 w-[260px] shadow-2xl">
              <img
                src={magicTopImg}
                alt="Reading preview"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* HEADING */}
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl leading-tight italic">
              Discover The Magic Of <br /> Reading!
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-6 text-sm md:text-base text-gray-200 leading-relaxed">
              Step into a world of stories, knowledge, and inspiration. Browse
              our curated collection of books — from timeless classics to
              today’s bestsellers.
            </p>

            {/* BUTTON */}
            <Link
              to="/shop"
              className="
                inline-block
                mt-10
                px-14
                py-4
                rounded-full
                bg-[#D6B24A]
                text-white
                text-sm
                tracking-widest
                hover:bg-[#c4a23f]
                transition
              "
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* ================= NEW ARRIVALS ================= */}
      <section className="bg-[#FEFCF9] pt-20 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-['Playfair_Display'] text-[#2E2E2E] mb-14 text-center">
            New Arrivals
          </h2>

          {loading && (
            <p className="text-center text-gray-500">Loading products...</p>
          )}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 cursor-pointer">
              {products.slice(0, 4).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="text-center text-gray-400">No products found</p>
          )}
        </div>
      </section>

      {/* ================= TESTIMONIAL SECTION ================= */}
      <section
        className="relative h-[90vh] w-full bg-center bg-cover bg-no-repeat bg-fixed flex items-center justify-center"
        style={{ backgroundImage: `url(${testimonialBg})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">

          {/* QUOTE */}
          <p className="font-['Playfair_Display'] text-xl md:text-2xl leading-relaxed italic text-[#F5E6C8]">
            “Ebook Spay is my go-to learning haven! Their curated collection of books
            makes exploring e-commerce, business, and entrepreneurship an absolute
            joy. Each title is insightful, practical, and perfectly tailored for
            anyone looking to grow their knowledge. What truly sets Ebook Spay apart
            is their seamless user experience and commitment to delivering quality
            content that empowers readers.”
          </p>

          {/* STARS */}
          <div className="flex justify-center gap-2 mt-8 text-[#D6B24A] text-xl">
            ★ ★ ★ ★ ★
          </div>

          {/* AUTHOR */}
          <p className="mt-6 text-xs tracking-[0.3em] uppercase text-gray-300">
            Sarah M. — Devoted Ebook Spay Fan
          </p>

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* CARD 1 */}
            <div className="bg-white rounded-2xl p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="text-2xl mb-6">🔒</div>
              <h3 className="font-['Playfair_Display'] text-xl mb-4">
                Secure Payments
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Shop with confidence knowing that your transactions are safeguarded.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-2xl p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="text-2xl mb-6">📘</div>
              <h3 className="font-['Playfair_Display'] text-xl mb-4">
                Instant Access
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Purchase and download your eBooks instantly and securely. Start
                reading in seconds.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-2xl p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="text-2xl mb-6">🔄</div>
              <h3 className="font-['Playfair_Display'] text-xl mb-4">
                Read Anywhere, Anytime
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Enjoy reading on any device. Your library stays synced and accessible
                via the cloud.
              </p>
            </div>

            {/* CARD 4 */}
            <div className="bg-white rounded-2xl p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="text-2xl mb-6">🎧</div>
              <h3 className="font-['Playfair_Display'] text-xl mb-4">
                Dedicated Reader Support
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our support team is always here to help you get back to reading
                quickly.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section
        className="relative h-[80vh] w-full bg-center bg-cover bg-no-repeat bg-fixed flex items-center"
        style={{ backgroundImage: `url(${expandBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl ml-auto text-white">

            {/* EYEBROW */}
            <p className="text-xs tracking-[0.35em] uppercase mb-4 text-gray-300">
              Unlock
            </p>

            {/* HEADING */}
            <h2 className="font-['Playfair_Display'] text-4xl md:text-4xl leading-tight">
              Expand Your Mind, Master <br />
              <span className="italic">New Worlds!</span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-6 text-sm md:text-base text-gray-200 leading-relaxed">
              Dive into our curated digital library and start your next great
              adventure. Knowledge, fiction, and inspiration await.
            </p>

            {/* BUTTON */}
            <Link
              to="/shop"
              className="
                inline-block
                mt-10
                px-14
                py-4
                rounded-full
                bg-[#D6B24A]
                text-white
                text-sm
                tracking-widest
                hover:bg-[#c4a23f]
                transition
              "
            >
              BUY NOW
            </Link>

          </div>
        </div>
      </section>
    </>
  );
};

export default Home;