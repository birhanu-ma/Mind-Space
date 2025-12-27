import Chat from "../../model/ChatModel.js";
function socketHandler(io) {
  console.log("✅ Socket.IO || initialized");

  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    // ✅ Join a specific room
    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`✅ User ${socket.id} joined room: ${room}`);
    });

    // ✅ Leave room
    socket.on("leave_room", (room) => {
      socket.leave(room);
      console.log(`🚪 User ${socket.id} left room: ${room}`);
    });

    // ✅ Handle sending a message
    socket.on("send_message", async (data) => {
      console.log("data is reached here to ", data);
      try {
        const { room, message, sender } = data;
        console.log(`💬 [${room}] ${sender}: ${message}`);

        // 🧠 1. Save message to MongoDB
        const newMessage = await Chat.create({
          room,
          message,
          sender,
        });

        // 🧠 2. Broadcast message to all users in the room (including sender)
        io.to(room).emit("receive_message", newMessage);
      } catch (error) {
        console.error("❌ Error saving chat message:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
    });
  });
}

export default socketHandler;
