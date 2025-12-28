// models/chatModel.js (or whatever the file name is)
import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  room: {
    type: String,
    required: [true, "Chat room is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",  // ← Changed from "Student" to "User"
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-populate sender with name, photo, role, etc.
ChatSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sender",
    select: "name photo role", // Add photo if you want avatars in chat
  });
  next();
});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;