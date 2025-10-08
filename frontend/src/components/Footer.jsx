import React from "react";
export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Rare Plants Marketplace — College Demo.
      </div>
    </footer>
  );
}
