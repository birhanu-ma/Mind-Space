import Chat from "../../model/ChatModel.js";

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
