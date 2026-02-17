import contactHero from "../assets/images/contact-hero.jpg";

export default function ContactUs() {
  return (
    <div className="bg-gray-50 text-gray-900">

      {/* ================= HERO ================= */}
      <section
        className="relative h-[450px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${contactHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        <div className="relative text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide">
            Let's Connect
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            Have a question or idea? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ================= MAIN SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 -mt-24 pb-24 relative z-10">
        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">

          {/* ===== LEFT PANEL ===== */}
          <div className="bg-black text-white p-12 flex flex-col justify-between">

            <div>
              <h2 className="text-3xl font-semibold mb-8">
                Contact Information
              </h2>

              <div className="space-y-6 text-gray-300">
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-400">
                    Phone
                  </p>
                  <p className="text-lg font-medium text-white">
                    +91 8450007614
                  </p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-400">
                    Email
                  </p>
                  <p className="text-lg font-medium text-white">
                    inquiry@spay.live
                  </p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-400">
                    Address
                  </p>
                  <p className="leading-relaxed">
                    316 Laxmi Plaza, Laxmi Industrial Estate,
                    <br />
                    Andheri West, Mumbai,
                    <br />
                    Maharashtra, 400053
                  </p>
                </div>
              </div>
            </div>

           

          </div>

          {/* ===== RIGHT PANEL (GLASS FORM) ===== */}
          <div className="bg-white/80 backdrop-blur-lg p-12">

            <h2 className="text-3xl font-semibold mb-8">
              Send a Message
            </h2>

            <form className="space-y-6">

              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border-b border-gray-400 bg-transparent py-3 focus:outline-none focus:border-black transition"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border-b border-gray-400 bg-transparent py-3 focus:outline-none focus:border-black transition"
                />
              </div>

              <div className="relative">
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full border-b border-gray-400 bg-transparent py-3 focus:outline-none focus:border-black transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-6 bg-black text-white px-8 py-3 rounded-full hover:scale-105 transition duration-300"
              >
                SEND MESSAGE
              </button>

            </form>

          </div>

        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="h-[400px] w-full">
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Laxmi%20Plaza%20Andheri%20West&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </section>

    </div>
  );
}
