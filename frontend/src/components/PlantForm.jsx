import React, { useState } from "react";
import API from "../api/api";

export default function PlantForm({ onSaved, existing }) {
  const [form, setForm] = useState({
    title: existing?.title || "",
    description: existing?.description || "",
    category: existing?.category || "",
    price: existing?.price || "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("price", form.price);
      if (imageFile) fd.append("image", imageFile);
      if (existing) {
        const res = await API.put(`/plants/${existing._id}`, fd);
        onSaved(res.data);
      } else {
        const res = await API.post("/plants", fd);
        onSaved(res.data);
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Error saving plant");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        required
        name="title"
        value={form.title}
        onChange={handle}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handle}
        placeholder="Description"
        className="w-full p-2 border rounded"
      ></textarea>
      <input
        name="category"
        value={form.category}
        onChange={handle}
        placeholder="Category"
        className="w-full p-2 border rounded"
      />
      <input
        required
        name="price"
        value={form.price}
        onChange={handle}
        type="number"
        placeholder="Price"
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
