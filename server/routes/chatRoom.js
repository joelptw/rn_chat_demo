const express = require("express");
const Route = express.Router();
const Chat = require("../models/chatRoom");

Route.post("/", async (req, res) => {
  const { employee, employer } = req.body;
  // employer = req.user.id;
  try {
    let chat = await Chat.findOne({ employer, employee }).lean();

    if (chat) {
      console.log("si hay" + chat);
      return res.status(200).json(chat._id);
    }
    chat = await Chat.create(req.body);
    console.log("creo " + chat);
    res.status(200).json(chat._id);
  } catch (error) {
    console.error(error);
    res.status(500).json("server error");
  }
});

Route.get("/", async (req, res) => {
  try {
    const chats = await Chat.find().lean();

    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json("server error");
  }
});

//By employee
Route.get("/:employee_id", async (req, res) => {
  try {
    const chats = await Chat.find({ employee: req.params.employee_id }).lean();

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

//By employee
Route.get("/:employer_id", async (req, res) => {
  try {
    const chats = await Chat.find({ employer: req.params.employer_id }).lean();

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

Route.delete("/:id", async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);

    res.status(200).json("Char borrado");
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

module.exports = Route;
