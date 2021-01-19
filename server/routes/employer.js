const express = require("express");
const Route = express.Router();
const Employer = require("../models/employer");

Route.post("/", async (req, res) => {
  try {
    const employer = await Employer.create(req.body);

    res.status(200).json(employer);
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
});

Route.get("/", async (req, res) => {
  try {
    const employer = await Employer.find();

    res.status(200).json(employer);
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
});

module.exports = Route;
