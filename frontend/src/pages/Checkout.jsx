import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    setLoading(true);
    try {
      const res = await API.post("/orders/checkout");
      alert("Order placed (mock). Order id: " + res.data.order._id);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Error during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Checkout (Mock)</h2>
      <p>
        This is a mock payment for the college demo. Press confirm to place the
        order.
      </p>
      <div className="mt-4">
        <button
          onClick={submit}
          disabled={loading}
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          {loading ? "Processing..." : "Confirm & Pay (Mock)"}
        </button>
      </div>
    </div>
  );
}
