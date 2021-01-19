const mongoose = require("mongoose");

const DevicesSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  platform: { type: String },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("devices", DevicesSchema);
