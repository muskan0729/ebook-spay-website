import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";

const OrderComplete = () => {
  const navigate = useNavigate();

  const { execute: checkStatus } = usePost("paytm/status");

  const [status, setStatus] = useState("pending");
  const [orderId, setOrderId] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // =========================
  // LOAD ORDER ID FROM URL
  // =========================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("orderId");

    if (!id) {
      navigate("/checkout");
      return;
    }

    setOrderId(id);
  }, [navigate]);

  // =========================
  // CHECK PAYMENT STATUS
  // =========================
  useEffect(() => {
    if (!orderId) return;

    const fetchStatus = async () => {
      try {
        setStatus("pending");

        const res = await checkStatus({ orderId });

        if (res?.order_status === "completed") {
          setStatus("success");
          setShowSuccessModal(true);
        } else if (res?.order_status === "failed") {
          setStatus("failed");
          setShowFailedModal(true);
        } else {
          setStatus("pending");
        }
      } catch (err) {
        console.error("STATUS CHECK ERROR:", err);
        setStatus("pending");
      }
    };

    fetchStatus();
  }, [orderId]);

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      {/* MAIN CARD */}
      <div className="bg-white p-8 rounded shadow text-center w-[420px]">

        <h1 className="text-xl font-bold mb-4">
          {status === "pending" && "Processing Payment..."}
          {status === "success" && "Payment Successful"}
          {status === "failed" && "Payment Failed"}
        </h1>

        {status === "pending" && (
          <div className="text-gray-500 animate-pulse">
            Checking payment status...
          </div>
        )}

        {status === "success" && (
          <button
            onClick={() => {
              navigate("/my-account/orders");
            }}
            className="bg-green-600 text-white px-6 py-2 rounded mt-4"
          >
            View Orders
          </button>
        )}

        {status === "failed" && (
          <button
            onClick={() => navigate("/checkout")}
            className="bg-red-600 text-white px-6 py-2 rounded mt-4"
          >
            Try Again
          </button>
        )}

        {status === "pending" && (
          <button
            onClick={() => navigate("/my-account/orders")}
            className="bg-yellow-600 text-white px-6 py-2 rounded mt-4"
          >
            View Orders
          </button>
        )}
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[420px] text-center">

            <div className="text-green-600 text-5xl mb-4">✓</div>

            <h2 className="text-xl font-bold mb-2">
              Payment Successful
            </h2>

            <p className="text-gray-500 mb-6">
              Your order has been placed successfully.
            </p>

            <button
              onClick={() => navigate("/my-account/orders")}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              View Orders
            </button>

          </div>
        </div>
      )}

      {/* FAILED MODAL */}
      {showFailedModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-lg w-[420px] relative">

            <button
              className="absolute right-4 top-3 text-xl"
              onClick={() => navigate("/checkout")}
            >
              ×
            </button>

            <div className="text-red-600 text-5xl text-center mb-4">
              ✕
            </div>

            <h2 className="text-xl font-bold text-center mb-2">
              Payment Failed
            </h2>

            <p className="text-gray-500 text-center">
              Your payment could not be completed.
            </p>

          </div>

        </div>
      )}

    </div>
  );
};

export default OrderComplete;