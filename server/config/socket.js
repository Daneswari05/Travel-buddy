import socketio from "socket.io";

const io = socketio(5000);

io.on("connection", (socket) => {
  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", { message: data.message });
  });
});
