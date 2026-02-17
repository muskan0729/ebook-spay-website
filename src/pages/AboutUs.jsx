import aboutHero from "../assets/images/about-hero.jpg";
import bookshelf from "../assets/images/bookshelf.jpg";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="about-wrapper bg-white text-gray-800">

      {/* ================= HERO ================= */}
      <section
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${aboutHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white px-6"
        >
          <h1 className="text-5xl md:text-6xl font-semibold tracking-wide">
            About EbookSpay
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-200 text-lg">
            Where stories inspire minds and books build communities.
          </p>
        </motion.div>
      </section>

      {/* ================= STORY ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-light leading-snug mb-6">
            From Passion To Pages
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our journey began with a profound love for books—the way they
            transport us to new worlds, spark imagination, and preserve
            timeless wisdom.
          </p>
        </div>

        <div className="bg-gray-50 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">
          <h6 className="text-sm font-semibold tracking-widest text-gray-500 mb-4">
            OUR STORY
          </h6>
          <p className="text-gray-600 mb-4">
            EbookSpay was created to be more than just a bookstore. It’s a
            destination where stories live, inspire, and connect readers
            everywhere.
          </p>
          <p className="text-gray-600">
            We believe every book has the power to shape ideas and ignite
            creativity.
          </p>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="bg-gray-100 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h6 className="text-sm font-semibold tracking-widest text-gray-500 mb-4">
            QUALITY CURATION
          </h6>
          <h2 className="text-4xl md:text-5xl font-light mb-10">
            Books Are Experiences
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Handpicked Titles</h3>
              <p className="text-gray-600">
                Every book is carefully selected to ensure quality,
                authenticity, and impact.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Trusted Publishers</h3>
              <p className="text-gray-600">
                We partner with reliable publishers to bring you genuine
                editions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Diverse Collection</h3>
              <p className="text-gray-600">
                From fiction to business, we curate something for every
                reader.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY IMAGE SECTION ================= */}
      <section
        className="relative h-[500px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${bookshelf})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <h6 className="text-sm font-semibold tracking-widest mb-4">
            READER-CENTRIC APPROACH
          </h6>
          <h2 className="text-4xl md:text-5xl mb-6 leading-snug">
            Building A Community <br /> Of Lifelong Readers
          </h2>
          <p className="max-w-xl text-gray-200 text-lg">
            Personalized recommendations, easy browsing, hassle-free returns,
            and dedicated support—because readers always come first.
          </p>
        </div>
      </section>

      {/* ================= SUSTAINABILITY ================= */}
      <section className="text-center px-6 py-24">
        <h6 className="text-sm font-semibold tracking-widest text-gray-500 mb-4">
          SUSTAINABLE READING
        </h6>
        <h2 className="text-4xl md:text-5xl font-light mb-6">
          Conscious Choices For A Better Tomorrow
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          EbookSpay supports eco-friendly publishing, recyclable packaging,
          and literacy initiatives that help build a greener future.
        </p>
      </section>

    </div>
  );
}
