const RefundPolicy = () => {
  return (
    <section className="policy-wrapper">
      <div className="policy-card">
        <h1 className="policy-title">Refund Policy – Ebookspay</h1>

        <p className="policy-date">
          <strong>Effective Date:</strong> December 19, 2025
        </p>

        <p className="policy-text">
          Ebookspay is committed to delivering high-quality digital content.
          Please read this Refund Policy carefully before making a purchase.
        </p>

        <div className="policy-section">
          <h2>1. No Refunds on Digital Products</h2>
          <p>
            All purchases of eBooks on Ebookspay are final. Due to the digital
            nature of our products, we do not offer refunds once a purchase
            has been completed.
          </p>
        </div>

        <div className="policy-section">
          <h2>2. Exceptions</h2>
          <p>
            Refunds are not provided for accidental purchases, change of mind,
            or lack of usage after purchase.
          </p>
        </div>

        <div className="policy-section">
          <h2>3. Technical Issues</h2>
          <p>
            If you experience technical difficulties accessing your purchased
            eBook, please contact our support team. We will assist you in
            resolving access issues, but this does not constitute a refund.
          </p>
        </div>

        <div className="policy-section">
          <h2>4. Acceptance</h2>
          <p>
            By purchasing from Ebookspay, you acknowledge and agree that all
            digital sales are non-refundable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RefundPolicy;
