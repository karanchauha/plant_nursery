import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="bg-green-50 p-8 rounded mb-6">
        <h1 className="text-2xl font-bold">Rare Plants Marketplace</h1>
        <p className="mt-2">
          Buy and sell rare plants worldwide — demo project.
        </p>
        <Link
          to="/plants"
          className="inline-block mt-4 bg-green-700 text-white px-4 py-2 rounded"
        >
          Browse Plants
        </Link>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">How it works</h2>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Sellers register and add plant listings with images.</li>
          <li>Buyers browse, add to cart, and checkout (mock).</li>
          <li>Seller dashboard shows seller's listings.</li>
        </ol>
      </div>
    </div>
  );
}
