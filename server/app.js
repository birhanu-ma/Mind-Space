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
import petitionRoute from "./route/petitionRoute.js";
import counselingRoute from "./route/counselingRoute.js";
import applicationRoute from "./route/applicationRoute.js";
import articleRoute from "./route/articleRoute.js";
import forumsRoute from "./route/forumsRoute.js";
import serviceRoute from "./route/serviceRoute.js";
import professionRoute from "./route/professionRoute.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/img/users", express.static(path.join(__dirname, "public/img/users")));

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/petitions", petitionRoute);
app.use("/api/v1/applications", applicationRoute);
app.use("/api/v1/counseling", counselingRoute);
app.use("/api/v1/articles", articleRoute);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/forums", forumsRoute);
app.use("/api/v1/professions", professionRoute);
app.use("/api/v1/petitions", petitionRoute);

export default app;
