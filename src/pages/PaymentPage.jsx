import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const loadPaytmScript = (mid) => {
    return new Promise((resolve, reject) => {
      if (window.Paytm?.CheckoutJS) return resolve(true);

      const script = document.createElement("script");
      script.src = `https://secure.paytmpayments.com/merchantpgpui/checkoutjs/merchants/${mid}.js`;
      script.async = true;

      script.onload = resolve;
      script.onerror = () => reject("Paytm SDK failed");

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("orderData");
    const data =
      location.state || (saved ? JSON.parse(saved) : null);

    if (!data) {
      navigate("/checkout");
      return;
    }

    const { orderId, txnToken, mid, amount } = data;

    const initPaytm = async () => {
      try {
        await loadPaytmScript(mid);

        await new Promise((resolve, reject) => {
          let count = 0;

          const timer = setInterval(() => {
            count++;

            if (window.Paytm?.CheckoutJS?.init) {
              clearInterval(timer);
              resolve();
            }

            if (count > 20) {
              clearInterval(timer);
              reject("Paytm init timeout");
            }
          }, 300);
        });

        const Paytm = window.Paytm.CheckoutJS;

        const config = {
          root: "",
          flow: "DEFAULT",

          data: {
            orderId,
            token: txnToken,
            tokenType: "TXN_TOKEN",
            amount,
          },

          merchant: { mid },

          handler: {
            notifyMerchant: function (eventName, data) {
              console.log("PAYTM EVENT:", eventName, data);

              if (eventName === "APP_CLOSED") {
                navigate("/checkout");
              }

              if (eventName === "TXN_SUCCESS") {
                navigate(`/payment-result?orderId=${orderId}`);
              }

              if (eventName === "TXN_FAILURE") {
                navigate(`/payment-result?orderId=${orderId}`);
              }
            },
          },
        };

        await Paytm.init(config);
        Paytm.invoke();
      } catch (err) {
        console.error("Paytm Init Error:", err);
        navigate(`/payment-result?orderId=${data.orderId}`);
      }
    };

    initPaytm();
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-gray-600">Redirecting to payment...</h2>
    </div>
  );
};

export default PaymentPage;