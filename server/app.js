// file to write a route description

import express from "express";
const app = express();
import { fileURLToPath } from "url";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import userRoute from "./route/userRoute.js";
import petitionRoute from "./route/petitionRoute.js"
import counsellingRoute from "./route/counsellingRoute.js"
import applicationRoute from "./route/applicationRoute.js"
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


app.use("/users", userRoute)
app.use("/petitions",petitionRoute)
app.use("/application",applicationRoute)
app.use("/counselling",counsellingRoute)

export default app;
