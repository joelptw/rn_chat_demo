const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chatRoom",
    required: true
  },
  user: {
    _id: {
      type: String,
      required: true
    }
  },
  text: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Message = mongoose.model("messages", MessageSchema);
