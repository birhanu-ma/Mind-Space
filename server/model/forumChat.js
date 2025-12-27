// model/ForumChat.js
import mongoose from "mongoose";

const forumChatSchema = new mongoose.Schema(
  {
    // Reference to the Forum this chat belongs to
    forum: {
      type: mongoose.Schema.ObjectId,
      ref: "Forum",
      required: [true, "ForumChat must belong to a forum"],
      index: true, // for fast queries by forum
    },

    // The message content
    message: {
      type: String,
      required: [true, "Message cannot be empty"],
      trim: true,
      maxlength: [1000, "Message too long (max 1000 chars)"],
    },

    // Sender's User ID (we store it for moderation/banning later)
    // But NEVER display name/photo in frontend → keeps anonymity
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    // Optional: Anonymous display name (e.g., "User_abc", but we just use "Anonymous")
    // Not needed if you always show "Anonymous"

    // Timestamps
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for efficient retrieval: newest first per forum
forumChatSchema.index({ forum: 1, createdAt: -1 });

const ForumChat = mongoose.model("ForumChat", forumChatSchema);

export default ForumChat;