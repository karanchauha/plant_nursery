import React from "react";
import { Link } from "react-router-dom";

export default function PlantCard({ plant }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <img
        src={
          plant.imagePath
            ? (import.meta.env.VITE_API_URL?.replace("/api", "") ||
                "http://localhost:5000") + plant.imagePath
            : "/placeholder.jpg"
        }
        alt={plant.title}
        className="h-44 w-full object-cover rounded"
      />
      <div className="mt-3 flex-1">
        <h3 className="font-semibold">{plant.title}</h3>
        <p className="text-sm text-gray-500">
          {plant.category} • ${plant.price}
        </p>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <Link to={`/plants/${plant._id}`} className="text-sm text-green-700">
          View
        </Link>
      </div>
    </div>
  );
}
