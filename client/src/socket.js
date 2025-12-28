// src/socket.js
import { io } from "socket.io-client";

export const socket = io("https://mind-space-atfn.onrender.com", {
  transports: ["websocket"], 
  withCredentials: true,
  autoConnect: false,       
});
