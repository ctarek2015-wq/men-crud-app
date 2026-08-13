// model

const Fruit = require("../models/fruit");

// controllers

const home = async (req, res) => {
  res.render("home.ejs");
};

const index = async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits });
  } catch (err) {
    console.log(err.message);
    res.send("failed to get all fruits");
  }
};

const newFruit = async (req, res) => {
  res.render("fruits/new.ejs");
};
const show = async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/show.ejs", { fruit });
  } catch (err) {
    console.log(err.message);
    res.send("failed to get fruit");
  }
};

const edit = async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/edit.ejs", { fruit });
  } catch (err) {
    console.log(err.message);
    res.send("failed to update fruit");
  }
};

const create = async (req, res) => {
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
};

const update = async (req, res) => {
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
};

const deleteFruit = async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id);
    res.redirect("/fruits");
  } catch (err) {
    console.log(err.message);
    res.send("failed to delete fruit");
  }
};

//Exporting

module.exports = {
  home,
  index,
  newFruit,
  show,
  edit,
  create,
  update,
  deleteFruit,
};
