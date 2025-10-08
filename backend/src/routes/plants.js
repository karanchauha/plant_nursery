const express = require("express");
const Plant = require("../models/Plant");
const { auth, requireRole } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// create plant (seller)
router.post(
  "/",
  auth,
  requireRole("seller"),
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, category, price } = req.body;
      const imagePath = req.file
        ? `/uploads/${req.file.filename}`
        : "/uploads/placeholder.jpg";
      const plant = new Plant({
        title,
        description,
        category,
        price,
        sellerId: req.user._id,
        imagePath,
      });
      await plant.save();
      res.json(plant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// edit plant
router.put(
  "/:id",
  auth,
  requireRole("seller"),
  upload.single("image"),
  async (req, res) => {
    try {
      const plant = await Plant.findById(req.params.id);
      if (!plant) return res.status(404).json({ message: "Plant not found" });
      if (plant.sellerId.toString() !== req.user._id.toString())
        return res.status(403).json({ message: "Not allowed" });

      const { title, description, category, price } = req.body;
      if (title) plant.title = title;
      if (description) plant.description = description;
      if (category) plant.category = category;
      if (price) plant.price = price;
      if (req.file) plant.imagePath = `/uploads/${req.file.filename}`;
      await plant.save();
      res.json(plant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// delete plant
router.delete("/:id", auth, requireRole("seller"), async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    if (plant.sellerId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });
    await plant.remove();
    res.json({ message: "Plant removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// list plants with search & filter & pagination
router.get("/", async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    if (minPrice)
      filter.price = Object.assign(filter.price || {}, {
        $gte: Number(minPrice),
      });
    if (maxPrice)
      filter.price = Object.assign(filter.price || {}, {
        $lte: Number(maxPrice),
      });
    const plants = await Plant.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Plant.countDocuments(filter);
    res.json({ plants, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get single plant
router.get("/:id", async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id).populate(
      "sellerId",
      "name email"
    );
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.json(plant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
