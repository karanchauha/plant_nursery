import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  const fetch = async () => {
    const res = await API.get("/cart");
    setCart(res.data || { items: [] });
  };

  useEffect(() => {
    fetch();
  }, []);

  const remove = async (id) => {
    await API.post("/cart/remove", { plantId: id });
    fetch();
  };

  const checkout = () => navigate("/checkout");

  const total = cart.items.reduce(
    (s, it) => s + (it.plant?.price || 0) * it.qty,
    0
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cart.items.length === 0 && <div>No items in cart</div>}
        {cart.items.map((it) => (
          <div
            key={it.plant._id}
            className="bg-white p-3 rounded flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  (import.meta.env.VITE_API_URL?.replace("/api", "") ||
                    "http://localhost:5000") + it.plant.imagePath
                }
                alt=""
                className="h-16 w-16 object-cover rounded"
              />
              <div>
                <div className="font-semibold">{it.plant.title}</div>
                <div className="text-sm text-gray-500">
                  ${it.plant.price} × {it.qty}
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => remove(it.plant._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white p-4 rounded flex justify-between items-center">
        <div className="font-semibold">Total: ${total.toFixed(2)}</div>
        <div>
          <button
            onClick={checkout}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
