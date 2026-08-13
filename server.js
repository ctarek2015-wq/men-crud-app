require("dotenv").config();
const express = require("express");

const methodOverride = require("method-override");
const path = require("path");

const app = express();
const mongoose = require("mongoose");

const morgan = require("morgan");
//Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// DB connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const fruitsCtrl = require("./controllers/fruitsctrl");

// GET
app.get("/", fruitsCtrl.home);

app.get("/fruits", fruitsCtrl.index);

app.get("/fruits/new", fruitsCtrl.newFruit);

app.get("/fruits/:id", fruitsCtrl.show);

app.get("/fruits/:id/edit", fruitsCtrl.edit);
// POST
app.post("/fruits", fruitsCtrl.create);
// PUT
app.put("/fruits/:id", fruitsCtrl.update);
// DELETE
app.delete("/fruits/:id", fruitsCtrl.deleteFruit);
