const express = require("express");
const Cart = require("../models/Cart");
const Plant = require("../models/Plant");
const { auth } = require("../middleware/auth");

const router = express.Router();

// get user's cart
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ buyerId: req.user._id }).populate(
    "items.plant"
  );
  res.json(cart || { items: [] });
});

// add/update item
router.post("/add", auth, async (req, res) => {
  const { plantId, qty = 1 } = req.body;
  const plant = await Plant.findById(plantId);
  if (!plant) return res.status(404).json({ message: "Plant not found" });

  let cart = await Cart.findOne({ buyerId: req.user._id });
  if (!cart) cart = new Cart({ buyerId: req.user._id, items: [] });

  const idx = cart.items.findIndex((i) => i.plant.toString() === plantId);
  if (idx >= 0) {
    cart.items[idx].qty = qty;
  } else {
    cart.items.push({ plant: plantId, qty });
  }
  await cart.save();
  res.json(cart);
});

// remove item
router.post("/remove", auth, async (req, res) => {
  const { plantId } = req.body;
  const cart = await Cart.findOne({ buyerId: req.user._id });
  if (!cart) return res.status(400).json({ message: "Cart empty" });
  cart.items = cart.items.filter((i) => i.plant.toString() !== plantId);
  await cart.save();
  res.json(cart);
});

// clear cart
router.post("/clear", auth, async (req, res) => {
  await Cart.findOneAndDelete({ buyerId: req.user._id });
  res.json({ message: "Cart cleared" });
});

module.exports = router;
