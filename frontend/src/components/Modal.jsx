import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <button className="text-sm text-gray-500 float-right" onClick={onClose}>
          Close
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
