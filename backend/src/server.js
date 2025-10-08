require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//   })
// );

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/plants", require("./routes/plants"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));

app.get("/", (req, res) => res.send("Rare Plants Marketplace API"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
