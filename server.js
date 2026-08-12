require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");

const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

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

app.get("/fruits", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.send(fruits);
  } catch (err) {
    console.log(err.message);
    res.send("failed to get all fruits");
  }
});

app.get("/fruits/new", async (req, res) => {
  res.render("fruits/new.ejs");
});

app.post("/fruits", async (req, res) => {
  try {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);

    res.redirect("/fruits");
  } catch (err) {
    console.log(err.message);
    res.send("failed to create");
  }
});
