import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import groupRoute from "./routes/group.js";
import projectRoute from "./routes/project.js";
import userRoute from "./routes/user.js";
import invitationRoute from "./routes/invitations.js";
import tasklistRoute from "./routes/taskList.js";
import taskRoute from "./routes/tasks.js";

config();
const app = express();

//using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/group", groupRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/invitation", invitationRoute);
app.use("/api/v1/tasklist", tasklistRoute);
app.use("/api/v1/task", taskRoute);

//using error middleware
app.use(errorMiddleware);

export default app;
