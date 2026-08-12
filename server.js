require("dotenv").config();
const express = require("express");

const methodOverride = require("method-override");
const path = require("path");

const app = express();
const mongoose = require("mongoose");

const morgan = require("morgan");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

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
  res.render("home.ejs");
});

app.get("/fruits", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits });
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

app.get("/fruits/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/show.ejs", { fruit });
  } catch (err) {
    console.log(err.message);
    res.send("failed to get fruit");
  }
});

app.delete("/fruits/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id);
    res.redirect("/fruits");
  } catch (err) {
    console.log(err.message);
    res.send("failed to delete fruit");
  }
});

app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/edit.ejs", { fruit });
  } catch (err) {
    console.log(err.message);
    res.send("failed to update fruit");
  }
});

app.put("/fruits/:id", async (req, res) => {
  try {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/fruits/${req.params.id}`);

    res.redirect("/fruits");
  } catch (err) {
    console.log(err.message);
    res.send("failed to create");
  }
});
