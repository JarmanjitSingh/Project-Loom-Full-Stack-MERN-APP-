import cors from "cors";
import { config } from "dotenv";
import express from "express";
import userRoute from "./routes/user.js";

config();
const app = express();

//using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));


//using routes
app.use("/api/v1/user", userRoute);

export default app;
