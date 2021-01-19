const express = require("express");
const Route = express.Router();
const Employee = require("../models/employee");

Route.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(200).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
});

Route.get("/", async (req, res) => {
  try {
    const employee = await Employee.find();

    res.status(200).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
});

module.exports = Route;
