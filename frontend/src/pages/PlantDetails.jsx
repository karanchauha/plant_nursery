import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/plants/${id}`)
      .then((res) => setPlant(res.data))
      .catch(() => {});
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    await API.post("/cart/add", { plantId: plant._id, qty });
    alert("Added to cart");
  };

  if (!plant) return <div>Loading...</div>;
  const base =
    import.meta.env.VITE_API_URL?.replace("/api", "") ||
    "http://localhost:5000";
  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="md:flex gap-6">
        <img
          src={base + plant.imagePath}
          alt={plant.title}
          className="w-full md:w-1/3 h-72 object-cover rounded"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{plant.title}</h2>
          <p className="text-sm text-gray-500">{plant.category}</p>
          <p className="mt-3">{plant.description}</p>
          <p className="mt-3 font-semibold text-lg">${plant.price}</p>
          <div className="mt-4 flex items-center gap-2">
            <input
              type="number"
              value={qty}
              min="1"
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-20 p-2 border rounded"
            />
            <button
              onClick={addToCart}
              className="bg-green-700 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
