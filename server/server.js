// file for server set up
import socketHandler from "./controller/chat/socketHandler.js"
import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import http from "http";
import {Server} from "socket.io"
import forumChatSocket from "./controller/chat/forumHandler.js";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;
const DB = process.env.LOCAL_DATABASE;

mongoose.connect(DB).then(() => console.log("DB is connected"));

const server = http.createServer(app);
const io = new Server(server,{
  cors:{

    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
})
socketHandler(io)
forumChatSocket(io)
server.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
