import React, { useEffect, useState } from "react";
import API from "../api/api";
import PlantCard from "../components/PlantCard";

export default function Plants() {
  const [plants, setPlants] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetch = async () => {
    const res = await API.get("/plants", {
      params: { q, category, minPrice, maxPrice },
    });
    setPlants(res.data.plants);
  };

  useEffect(() => {
    fetch();
  }, []);

  const search = async (e) => {
    e.preventDefault();
    fetch();
  };

  return (
    <div>
      <form className="mb-4 flex gap-2" onSubmit={search}>
        <input
          className="p-2 border rounded flex-1"
          placeholder="Search title"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          className="p-2 border rounded w-32"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="p-2 border rounded w-28"
          placeholder="Min $"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="p-2 border rounded w-28"
          placeholder="Max $"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button className="bg-green-700 text-white px-3 rounded">Search</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plants.map((p) => (
          <PlantCard key={p._id} plant={p} />
        ))}
      </div>
    </div>
  );
}
