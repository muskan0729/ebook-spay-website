import aboutHero from "../assets/images/about-hero.jpg";
import bookshelf from "../assets/images/bookshelf.jpg";

export default function AboutUs() {
  return (
    <div className="about-wrapper">

      {/* HERO */}
      <section
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${aboutHero})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-white text-4xl md:text-5xl font-semibold">
          About Us
        </h1>
      </section>

      {/* STORY */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl md:text-4xl italic font-light leading-snug">
            From Passion To Pages:<br />
            The Birth Of EbookSpay
          </h2>
        </div>

        <div>
          <h6 className="text-sm font-semibold tracking-widest mb-4">
            OUR STORY
          </h6>
          <p className="mb-4 text-gray-600">
            Our journey began with a simple yet profound love for books—the way
            they transport us to new worlds, spark imagination, and preserve
            timeless wisdom.
          </p>
          <p className="text-gray-600">
            EbookSpay was created to be more than just a bookstore. It’s a place
            where stories live, inspire, and connect readers everywhere.
          </p>
        </div>
      </section>

      {/* QUALITY */}
      <section className="text-center px-6 py-20 bg-gray-50">
        <h6 className="text-sm font-semibold tracking-widest mb-4">
          QUALITY CURATION
        </h6>
        <h2 className="text-3xl md:text-4xl italic font-light mb-6">
          We Believe Books Are More Than Pages<br />
          They're Experiences Worth Cherishing
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Every title is hand-selected with care. We partner with trusted
          publishers to ensure authenticity, excellent quality, and diverse
          selections.
        </p>
      </section>

      {/* IMAGE SECTION (Bookshelf Background) */}
      <section
        className="relative h-[450px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${bookshelf})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <h6 className="text-sm font-semibold tracking-widest mb-4">
            READER-CENTRIC APPROACH
          </h6>
          <h2 className="text-3xl md:text-4xl mb-4">
            Beyond Books: Nurturing A<br /> Community Of Lifelong Readers
          </h2>
          <p className="max-w-xl">
            Personalized recommendations, easy browsing, hassle-free returns,
            and dedicated support—because readers always come first.
          </p>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="text-center px-6 py-20">
        <h6 className="text-sm font-semibold tracking-widest mb-4">
          SUSTAINABLE READING
        </h6>
        <h2 className="text-3xl md:text-4xl italic font-light mb-6">
          Conscious Choices For A Better Tomorrow
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          EbookSpay supports eco-friendly publishing, recyclable packaging, and
          literacy initiatives that help build a greener future.
        </p>
      </section>

    </div>
  );
}
