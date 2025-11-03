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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/img/users", express.static(path.join(__dirname, "puplic/img/users")));

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
app.use("/users", userRoute);
app.use("/users", userRoute);
app.use("/petitions", petitionRoute);
app.use("/application", applicationRoute);
app.use("/counseling", counselingRoute);
app.use("/articles", articleRoute);

export default app;
