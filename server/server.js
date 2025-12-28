import socketHandler from "./controller/chat/socketHandler.js";
import forumChatSocket from "./controller/chat/forumHandler.js";
import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_URI;

mongoose
  .connect(DB)
  .then(() => console.log("DB is connected"))
  .catch(err => console.error("DB connection error:", err));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

socketHandler(io);
forumChatSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
