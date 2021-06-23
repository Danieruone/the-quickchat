class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      socket.emit("welcome-message", {
        message: `welcome to the server ${socket.id}`,
        date: new Date(),
      });

      socket.on("client-message", ({ message, date, color }) => {
        this.io.emit("client-message", {
          message,
          date,
          color,
        });
        console.log(`ìd: ${socket.id}, message: ${message}`);
      });
    });
  }
}

module.exports = Sockets;
