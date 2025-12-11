const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Basic test route
app.get("/", (req, res) => {
  res.send("Restaurant API is running!");
});

// Menu Model
const MenuItem = mongoose.model(
  "MenuItem",
  new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
  })
);

// GET menu items
app.get("/api/menu", async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

// POST order
app.post("/api/order", async (req, res) => {
  console.log("Order received:", req.body);
  res.json({ message: "Order saved!" });
});

// Run server on NEW PORT
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
