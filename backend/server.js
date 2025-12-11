const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.get("/", (req, res) => {
  res.send("Restaurant API is running!");
});

const MenuItem = mongoose.model(
  "MenuItem",
  new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
  })
);

app.get("/api/menu", async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

app.post("/api/order", async (req, res) => {
  console.log("Order received:", req.body);
  res.json({ message: "Order saved!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
