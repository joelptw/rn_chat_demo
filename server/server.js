const express = require("express");
const App = express();
const socketio = require("socket.io");
const http = require("http");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const server = http.createServer(App);

//Models for chat
const message = require("./models/message");
const chats = require("./models/chatRoom");
const io = socketio(server);

dotenv.config({ path: "./config/config.env" });

connectDb();

App.use(express.json());

App.use("/api/employees", require("./routes/employee"));
App.use("/api/employers", require("./routes/employer"));
App.use("/api/chats", require("./routes/chatRoom"));
App.use("/api/messages", require("./routes/messages"));
App.use("/api/devices", require("./routes/device"));
App.use("/api/sendnotification", require("./routes/send-notification"));

const PORT = process.env.PORT || 5000;

// Socket io server

io.on("connection", socket => {
  console.log(`User conneceted -> ${socket.id}`);

  socket.on("newMessage", ({ chat, msg }) => {
    const { user, text } = msg[0];
    console.log(msg);
    console.log(chat);
    const newMessage = new message({
      chatId: chat,
      user: {
        _id: user
      },
      text: text
    });
    newMessage.save();
  });

  socket.on("getRoom", async room => {
    const messages = await message.find({ chatId: room }).lean();
    console.log("jeje " + room);

    socket.emit("messages", messages.reverse());
  });

  socket.on("disconnect", () => console.log(`Disconnected: ${socket.id}`));
});

server.listen(PORT, console.log(`Server listen in port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`ERROR ${err.message}`);
  server.close(() => process.exit(1));
});
