require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");
const Plant = require("../models/Plant");

const MONGO = process.env.MONGO_URI;

const seed = async () => {
  await connectDB(MONGO);
  console.log("Seeding...");

  // clear existing
  await User.deleteMany({});
  await Plant.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const sellerPass = await bcrypt.hash("seller123", salt);
  const buyerPass = await bcrypt.hash("buyer123", salt);

  const seller = new User({
    name: "Demo Seller",
    email: "seller@demo.com",
    password: sellerPass,
    role: "seller",
  });
  const buyer = new User({
    name: "Demo Buyer",
    email: "buyer@demo.com",
    password: buyerPass,
    role: "buyer",
  });

  await seller.save();
  await buyer.save();

  const plants = [
    {
      title: "Variegated Monstera",
      description: "Rare variegated monstera cutting",
      category: "Aroid",
      price: 250,
      sellerId: seller._id,
      imagePath: "/uploads/placeholder.jpg",
    },
    {
      title: "Pink Princess Philodendron",
      description: "Beautiful pink variegation",
      category: "Philodendron",
      price: 400,
      sellerId: seller._id,
      imagePath: "/uploads/placeholder.jpg",
    },
    {
      title: "Blue Hoya",
      description: "Unique blue-ish leaves",
      category: "Hoya",
      price: 120,
      sellerId: seller._id,
      imagePath: "/uploads/placeholder.jpg",
    },
  ];

  await Plant.insertMany(plants);

  console.log(
    "Seeding done. Created seller@demo.com (pw seller123) and buyer@demo.com (pw buyer123)."
  );
  mongoose.connection.close();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
