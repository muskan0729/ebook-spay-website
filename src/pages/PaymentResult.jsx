import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";

const PaymentResult = () => {
  const navigate = useNavigate();
  const { execute: checkStatus } = usePost("paytm/status");

  const [status, setStatus] = useState("pending");
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("orderId");

    if (!id) {
      navigate("/checkout");
      return;
    }

    setOrderId(id);
  }, []);


  useEffect(() => {
  if (!orderId) return;

  let pollCount = 0;

  const interval = setInterval(async () => {
    try {
      pollCount++;

      const res = await checkStatus({ orderId });

      if (res?.order_status === "completed") {
        setStatus("success");
        clearInterval(interval);
        return;
      }

      if (res?.order_status === "failed") {
        setStatus("failed");
        clearInterval(interval);
        return;
      }

      if (pollCount >= 20) {
        setStatus("timeout");
        clearInterval(interval);
      }

    } catch (err) {
      console.error(err);
    }
  }, 3000);

  return () => clearInterval(interval);

}, [orderId, checkStatus]); // ✅ ADD THIS



  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-8 shadow rounded text-center w-[420px]">

        <h1>
          {status === "pending" && "Processing Payment..."}
          {status === "success" && "Payment Successful"}
          {status === "failed" && "Payment Failed"}
        </h1>
        {status === "timeout" && (
          <>
            <h2>
              Payment status is taking longer than expected.
            </h2>

            <button onClick={() => window.location.reload()}>
              Check Again
            </button>
          </>
        )}
        {status === "success" && (
          <button onClick={() => navigate("/my-account/orders")}>
            View Orders
          </button>
        )}

        {status === "failed" && (
          <button onClick={() => navigate("/checkout")}>
            Try Again
          </button>
        )}

      </div>

    </div>
  );
};

export default PaymentResult;