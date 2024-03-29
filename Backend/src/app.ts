import cors from "cors";
import { config } from "dotenv";
import express from "express";
import userRoute from "./routes/user.js";
import groupRoute from "./routes/group.js";
import projectRoute from "./routes/project.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

config();
const app = express();

//using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/group", groupRoute);
app.use("/api/v1/project", projectRoute);

//using error middleware
app.use(errorMiddleware);

export default app;
