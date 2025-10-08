const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  imagePath: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Plant", plantSchema);
