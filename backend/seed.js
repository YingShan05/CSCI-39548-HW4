const mongoose = require("mongoose");
require("dotenv").config();

const MenuItem = require("./models/MenuItem");

// Use environment variable
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/restaurantdb";

const items = [
  {
    name: "Burger",
    price: 7,
    image: "https://images.themodernproper.com/production/posts/2016/ClassicCheeseBurger_9.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1749310239&s=463b18fc3bb51dc5d96e866c848527c4"
  },
  {
    name: "Fries",
    price: 4,
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Web-Air-Fryer-Chips-305f379.jpg"
  },
  {
    name: "Soda",
    price: 2,
    image: "https://cdnimg.webstaurantstore.com/images/products/large/473849/1928114.jpg"
  }
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB. Seeding menu items...");

    await MenuItem.deleteMany({});
    await MenuItem.insertMany(items);

    console.log("Menu items added successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error seeding database:", err);
  });