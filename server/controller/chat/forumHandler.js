// socket/forumChatSocket.js
import ForumChat from "../../model/forumChat.js";

const FORUM_ROOM_PREFIX = "forum_";

function forumChatSocket(io) {
  console.log("Community Forum Socket.IO initialized");

  io.on("connection", (socket) => {
    console.log(`Forum user connected: ${socket.id}`);

    socket.on("join_room", (room) => {
      if (!room.startsWith(FORUM_ROOM_PREFIX)) {
        return socket.emit("error", { message: "Invalid forum room" });
      }
      socket.join(room);
      console.log(`Anonymous user joined forum room: ${room}`);
    });

    socket.on("send_message", async (data) => {
      try {
        const { room, message, sender } = data;

        if (!room.startsWith(FORUM_ROOM_PREFIX)) {
          return socket.emit("error", { message: "Not a forum room" });
        }

        const forumId = room.slice(FORUM_ROOM_PREFIX.length);

        const newMessage = await ForumChat.create({
          forum: forumId,
          message: message.trim(),
          sender, // Stored privately – never exposed
        });

        const broadcastMessage = {
          _id: newMessage._id,
          message: newMessage.message,
          createdAt: newMessage.createdAt,
          displayName: "Anonymous",
        };

        io.to(room).emit("receive_message", broadcastMessage);
        console.log(`Forum ${forumId}: Anonymous message sent`);
      } catch (error) {
        console.error("Forum chat error:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Forum user disconnected: ${socket.id}`);
    });
  });
}

export default forumChatSocket;