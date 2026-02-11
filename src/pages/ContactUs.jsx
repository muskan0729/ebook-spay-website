export default function ContactUs() {
  return (
    <div className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-overlay">
          <h1>Contact Us</h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="contact-intro">
        <h2>
          We’d Love To Hear From You — Whether It’s A
          <br />
          Book Recommendation, Order Question, Or Just Saying Hello
        </h2>
      </section>

      {/* CONTENT */}
      <section className="contact-content">
        {/* FORM */}
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea rows="6" placeholder="Message"></textarea>
          <button type="submit">SEND</button>
        </form>

        {/* INFO */}
        <div className="contact-info">
          <div>
            <p className="contact-label">PHONE</p>
            <p className="contact-value">+91 8450007614</p>
          </div>

          <div>
            <p className="contact-label">EMAIL</p>
            <p className="contact-value">inquiry@spay.live</p>
          </div>

          <div>
            <p className="contact-label">ADDRESS</p>
            <p className="contact-value">
              316 Laxmi Plaza, Laxmi Industrial Estate,
              <br />
              Andheri West, Mumbai,
              <br />
              Maharashtra, 400053
            </p>
          </div>

          <div>
            <p className="contact-label">FOLLOW US</p>
            <div className="contact-socials">
              <a href="#">Facebook</a>
              <a href="#">Pinterest</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="contact-map">
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Laxmi%20Plaza%20Andheri%20West&output=embed"
          loading="lazy"
        />
      </section>
    </div>
  );
}
