// file to write a route description

import express from "express";
const app = express();
import { fileURLToPath } from "url";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import authRoute from "./route/authRoute.js";
import userRoute from "./route/userRoute.js";
import menteeRoute from "./route/menteeRoute.js"
import counselingRoute from "./route/counselingRoute.js";
import counselorRoute  from "./route/counselorRoute.js"
import articleRoute from "./route/articleRoute.js";
import forumsRoute from "./route/forumsRoute.js";
import serviceRoute from "./route/serviceRoute.js";
import professionRoute from "./route/professionRoute.js";
import contactRoute from "./route/contactRoute.js"
import moodEntryRoute from "./route/moodEntryRoute.js"
import profileRoute from "./route/profileRoute.js"
import conversationRoute from "./route/conversationRoute.js"
import petitionRoute from "./route/petitionRoute.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.use("/img/users", express.static(path.join(__dirname, "public/img/users")));
app.use("/img/services", express.static(path.join(__dirname, "public/img/services")));

// Optional: If you have more folders later (e.g. articles, etc.)
// app.use("/img/articles", express.static(path.join(__dirname, "public/img/articles")));

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/mentee", menteeRoute);
app.use("/api/v1/counselor", counselorRoute);
app.use("/api/v1/counseling", counselingRoute);
app.use("/api/v1/articles", articleRoute);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/forums", forumsRoute);
app.use("/api/v1/professions", professionRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/mood-entry", moodEntryRoute);
app.use("/api/v1/profile", profileRoute)
app.use("/api/v1/conversation", conversationRoute);
app.use("/api/v1/petitions", petitionRoute);

export default app;
