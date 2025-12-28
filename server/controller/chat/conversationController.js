import Chat from "../../model/ChatModel.js";

import ForumChat from "../../model/forumChat.js"; // ← New model we created

export const getConversation = async (req, res, next) => {
  console.log("this is params", req.params.roomId);
  try {
    const chat = await Chat.find({ room: req.params.roomId });

    if (res) {
      res.status(200).json({
        status: "success",
        data: {
          chat,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};
export const getForumChat = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log("Fetching chat history for forum:", id);

    // Validate id
    if (!id || id.length !== 24) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid forum ID",
      });
    }

    const messages = await ForumChat.find({ forum: id })
      .sort({ createdAt: 1 })
      .select("-__v")
      .lean();

    const anonymizedMessages = messages.map((msg) => ({
      _id: msg._id,
      message: msg.message,
      createdAt: msg.createdAt,
      updatedAt: msg.updatedAt,
      displayName: "Anonymous",
    }));

    res.status(200).json({
      status: "success",
      results: anonymizedMessages.length,
      data: {
        messages: anonymizedMessages,
      },
    });
  } catch (err) {
    console.error("Error fetching forum chat history:", err);
    next(err);
  }
};
