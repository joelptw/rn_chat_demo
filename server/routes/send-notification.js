const express = require("express");
const fetch = require("node-fetch");
const Device = require("../models/devices");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { title, body, user } = req.body;
  try {
    const token = await Device.findOne({ user: user });
    const payload = {
      message: {
        token: token.token,
        notification: {
          title: title,
          body: body
        }
      }
    };

    const notification = {
      title: title,
      body: body,
      image: "https://placeimg.com/140/140/any"
    };

    const notificationBody = {
      notification: notification,
      registration_ids: [token.token]
    };

    console.log(notificationBody);

    fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization:
          "key=" +
          "AAAAN0ooqVQ:APA91bGfXIpslyE9sY6WgczXaMHkXCX-6_I-Admi0XxbG2w78yxc9lUeWKgJAyAYsnxD0z-NA6BmvEZDaTtyF9vbnF9A7aqys7Q2NsnDiebrgTPtV8MU0igvHxSWxydHxb8VC16akk9-",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(notificationBody)
    })
      .then(() => {
        res.status(200).send("Notificacion enviada!");
      })
      .catch(err => {
        res.status(500).send("Error al enviar notificacion");
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVjMDgzOGZkMjY4YTYyNjU0N2Q1ZjRhIiwicm9sZSI6ImVtcGxveWVlIn0sImlhdCI6MTYwMzYwNzIyNH0.Z7gN0M85qZ9jlueeo8GXU79-agceIB95bL0LfC8WZs8
