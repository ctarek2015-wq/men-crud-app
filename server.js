require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// server.js
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Fruit = require("./models/fruit");

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});
