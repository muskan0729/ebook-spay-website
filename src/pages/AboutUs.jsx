export default function AboutUs() {
  return (
    <div className="about-wrapper">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <h1>About Us</h1>
        </div>
      </section>

      {/* STORY */}
      <section className="about-section two-col">
        <div>
          <h2 className="italic-title">
            From Passion To Pages:<br />
            The Birth Of EbookSpay
          </h2>
        </div>

        <div>
          <h6 className="small-heading">OUR STORY</h6>
          <p>
            Our journey began with a simple yet profound love for books—the way
            they transport us to new worlds, spark imagination, and preserve
            timeless wisdom.
          </p>
          <p>
            EbookSpay was created to be more than just a bookstore. It’s a place
            where stories live, inspire, and connect readers everywhere.
          </p>
        </div>
      </section>

      {/* QUALITY */}
      <section className="about-section">
        <h6 className="small-heading">QUALITY CURATION</h6>
        <h2 className="italic-title">
          We Believe Books Are More Than Pages<br />
          They're Experiences Worth Cherishing
        </h2>
        <p className="center-text">
          Every title is hand-selected with care. We partner with trusted
          publishers to ensure authenticity, excellent quality, and diverse
          selections.
        </p>
      </section>

      {/* IMAGE SECTION */}
      <section className="about-image-section">
        <div className="image-text">
          <h6 className="small-heading">READER-CENTRIC APPROACH</h6>
          <h2>
            Beyond Books: Nurturing A<br /> Community Of Lifelong Readers
          </h2>
          <p>
            Personalized recommendations, easy browsing, hassle-free returns,
            and dedicated support—because readers always come first.
          </p>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="about-section">
        <h6 className="small-heading">SUSTAINABLE READING</h6>
        <h2 className="italic-title">
          Conscious Choices For A Better Tomorrow
        </h2>
        <p className="center-text">
          EbookSpay supports eco-friendly publishing, recyclable packaging, and
          literacy initiatives that help build a greener future.
        </p>
      </section>
    </div>
  );
}
