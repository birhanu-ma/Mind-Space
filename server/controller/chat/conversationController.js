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
  
    console.log(`Fetching chat history for forum: ${req.params}`);
  try {
    const { forumId } = req.params;


    // Validate forumId format (basic MongoDB ObjectId check)
    if (!forumId || forumId.length !== 24) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid forum ID",
      });
    }

    // Fetch messages for this forum, sorted oldest → newest
    const messages = await ForumChat.find({ forum: forumId })
      .sort({ createdAt: 1 }) // Chronological order
      .select("-__v") // Exclude version key
      .lean(); // Return plain JS objects (faster)

    // Transform for frontend: ensure anonymity
    const anonymizedMessages = messages.map((msg) => ({
      _id: msg._id,
      message: msg.message,
      createdAt: msg.createdAt,
      updatedAt: msg.updatedAt,
      displayName: "Anonymous", // Always anonymous in community chat
      // Do NOT send sender ID or any user info to client
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
