import express from "express";
import { config } from "dotenv";
import userRoute from "./routes/user.js";
import passport from "passport";
import cors from "cors";
import cookieSession from "cookie-session";
import "./middlewares/passport.js"


config();
console.log('clien id', process.env.CLIENT_ID, process.env.PORT)
const app = express();

//using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors());
    
    
    
    //using routes
    app.use("/api/v1/auth", userRoute);
    
  
export default app;
