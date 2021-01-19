const Devices = require("../models/devices");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { token, user } = req.body;
  try {
    const device = await Devices.findOneAndUpdate(
      { user: user },
      { $set: { token } },
      { upsert: true, new: true }
    );

    res.status(200).json({ device });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "server error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const devices = await Devices.find();

    res.status(200).json({ devices });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "server error." });
  }
});

module.exports = router;
