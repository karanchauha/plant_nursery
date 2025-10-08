const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Plant = require("../models/Plant");
const { auth } = require("../middleware/auth");

const router = express.Router();

// checkout (mock payment)
router.post("/checkout", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ buyerId: req.user._id }).populate(
      "items.plant"
    );
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart empty" });

    // mock payment: assume success
    const items = cart.items.map((it) => ({
      plant: it.plant._id,
      qty: it.qty,
      price: it.plant.price,
    }));
    const totalPrice = items.reduce((s, it) => s + it.qty * it.price, 0);

    const order = new Order({ buyerId: req.user._id, items, totalPrice });
    await order.save();

    // clear cart after order
    await Cart.findOneAndDelete({ buyerId: req.user._id });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get user's orders
router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ buyerId: req.user._id }).populate(
    "items.plant"
  );
  res.json(orders);
});

module.exports = router;
