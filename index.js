// express server
const express = require("express");
const app = express();
// socket server
const server = require("http").createServer(app);
//socket configuration server
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.emit("welcome-message", {
    message: `welcome to the server ${socket.id}`,
    date: new Date(),
  });

  socket.on("client-message", ({ message, date, color }) => {
    io.emit("client-message", {
      message,
      date,
      color,
    });
    console.log(`ìd: ${socket.id}, message: ${message}`);
  });
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
