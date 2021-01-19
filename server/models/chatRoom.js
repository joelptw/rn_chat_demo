const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employer",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Chat = mongoose.model("chatRoom", ChatRoomSchema);
