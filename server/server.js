// file for server set up
import express from "express";
import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import http from "http";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;
const DB = process.env.LOCAL_DATABASE;

mongoose.connect(DB).then(() => console.log("DB is connected"));

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
