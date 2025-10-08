import React, { useEffect, useState } from "react";
import API from "../api/api";
import PlantForm from "../components/PlantForm";

export default function SellerDashboard() {
  const [plants, setPlants] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetch = async () => {
    // fetch seller's plants: backend does not have seller-only route; use /plants and filter client-side
    const res = await API.get("/plants", { params: { limit: 100 } });
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const my = res.data.plants.filter(
      (p) =>
        (user && p.sellerId === user.id) ||
        (p.sellerId && p.sellerId._id === user?.id)
    );
    setPlants(my);
  };

  useEffect(() => {
    fetch();
  }, []);

  const onSaved = (p) => {
    setPlants((prev) => [p, ...prev]);
    setShowForm(false);
  };

  const remove = async (id) => {
    if (!confirm("Delete this plant?")) return;
    await API.delete(`/plants/${id}`);
    fetch();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Seller Dashboard</h2>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="bg-green-700 text-white px-3 py-2 rounded"
        >
          {showForm ? "Close" : "Add Plant"}
        </button>
      </div>
      {showForm && (
        <div className="mb-4 bg-white p-4 rounded">
          <PlantForm onSaved={onSaved} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plants.map((p) => (
          <div className="bg-white p-3 rounded" key={p._id}>
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-500">${p.price}</div>
              </div>
              <div>
                <button className="text-red-500" onClick={() => remove(p._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {plants.length === 0 && <div>No plants uploaded yet.</div>}
      </div>
    </div>
  );
}
