const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    // http server
    this.server = http.createServer(this.app);
    // socket config
    this.io = socketio(this.server, {
      /*config */
    });
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  socketConfig() {
    new Sockets(this.io);
  }

  execute() {
    // init middlewares
    this.middlewares();
    // init sockets
    this.socketConfig();
    // init server
    this.server.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}

module.exports = Server;
