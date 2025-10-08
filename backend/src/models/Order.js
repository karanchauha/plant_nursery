const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
      qty: Number,
      price: Number,
    },
  ],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
