const express = require("express");
const Route = express.Router();
const Message = require("../models/message");

Route.post("/:chat_id", async (req, res) => {
  req.body.chatId = req.params.chat_id;

  try {
    const message = await Message.create(req.body);
    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

Route.get("/:chat_id", async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chat_id })
      .lean()
      .limit(10);

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

module.exports = Route;
